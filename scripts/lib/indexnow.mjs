import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { indexNow } from './indexnow-config.mjs';

export const digest = (value) =>
  createHash('sha256').update(value).digest('hex');
const proofUrl = `${indexNow.origin}/${indexNow.key}.txt`;

export function canonicalUrl(value) {
  const url = new URL(value);
  if (
    url.origin !== indexNow.origin ||
    url.href !== value ||
    url.search ||
    url.hash ||
    url.username ||
    url.password ||
    !/^\/(en|fr)\/(?:[a-z0-9-]+\/)*$/.test(url.pathname)
  )
    throw new Error(`Not a canonical localized page: ${value}`);
  return value;
}

function inspectHtml(body, url, indexable) {
  const $ = load(body);
  if (
    $('link[rel="canonical"]').length !== 1 ||
    $('link[rel="canonical"]').attr('href') !== url
  )
    throw new Error(`Canonical mismatch: ${url}`);
  if (
    indexable &&
    /(?:noindex|none)/i.test($('meta[name="robots"]').attr('content') ?? '')
  )
    throw new Error(`Page is not indexable: ${url}`);
  return $;
}

// Local build inspection only. Building and testing never notify search engines.
export async function buildManifest(dist = 'dist') {
  const robots = await fs.readFile(path.join(dist, 'robots.txt'), 'utf8');
  const sitemap = await fs.readFile(path.join(dist, 'sitemap.xml'), 'utf8');
  const indexable = !/^Disallow:\s*\/\s*$/im.test(robots);
  const xml = load(sitemap, { xml: true });
  const urls = xml('urlset > url > loc')
    .map((_, el) => canonicalUrl(xml(el).text()))
    .get()
    .sort();
  if (!urls.length || new Set(urls).size !== urls.length)
    throw new Error('Empty or duplicate sitemap URLs');
  const pages = [];
  for (const url of urls) {
    const html = await fs.readFile(
      path.join(dist, new URL(url).pathname, 'index.html'),
    );
    const $ = inspectHtml(html, url, indexable);
    // An illustration/photo change is a content update even when its filename stays the same.
    const images = new Set();
    $('img[src],img[srcset],source[srcset]').each((_, el) => {
      for (const attribute of ['src', 'srcset']) {
        for (const candidate of ($(el).attr(attribute) ?? '').split(',')) {
          const src = candidate.trim().split(/\s+/)[0];
          if (src.startsWith('/') && !src.startsWith('//'))
            images.add(new URL(src, indexNow.origin).pathname);
        }
      }
    });
    const imageFiles = [];
    for (const image of [...images].sort())
      imageFiles.push({
        url: indexNow.origin + image,
        sha256: digest(await fs.readFile(path.join(dist, image))),
      });
    pages.push({
      url,
      sha256: digest(html),
      images: imageFiles,
      fingerprint: digest(digest(html) + JSON.stringify(imageFiles)),
    });
  }
  return {
    version: 1,
    origin: indexNow.origin,
    indexable,
    robotsSha256: digest(robots),
    sitemapSha256: digest(sitemap),
    pages,
  };
}

export function validateManifest(manifest) {
  if (
    manifest?.version !== 1 ||
    manifest.origin !== indexNow.origin ||
    typeof manifest.indexable !== 'boolean' ||
    !Array.isArray(manifest.pages)
  )
    throw new Error('Invalid IndexNow release manifest');
  for (const key of ['robotsSha256', 'sitemapSha256'])
    if (!/^[a-f0-9]{64}$/.test(manifest[key]))
      throw new Error(`Invalid ${key}`);
  const seen = new Set();
  for (const page of manifest.pages) {
    canonicalUrl(page.url);
    if (
      seen.has(page.url) ||
      !/^[a-f0-9]{64}$/.test(page.sha256) ||
      !/^[a-f0-9]{64}$/.test(page.fingerprint)
    )
      throw new Error('Invalid or duplicate page in release manifest');
    if (!Array.isArray(page.images))
      throw new Error('Missing image fingerprints');
    for (const image of page.images) {
      const url = new URL(image.url);
      if (
        url.origin !== indexNow.origin ||
        url.search ||
        url.hash ||
        !/^[a-f0-9]{64}$/.test(image.sha256)
      )
        throw new Error('Invalid image fingerprint');
    }
    seen.add(page.url);
  }
  if (!seen.size) throw new Error('Empty release manifest');
  return manifest;
}

export function changesSince(current, previous = null) {
  validateManifest(current);
  if (!current.indexable)
    throw new Error('Staging/noindex builds cannot be submitted');
  if (previous) validateManifest(previous);
  const old = new Map((previous?.pages ?? []).map((p) => [p.url, p]));
  const present = new Set(current.pages.map((p) => p.url));
  return {
    added: current.pages.filter((p) => !old.has(p.url)).map((p) => p.url),
    updated: current.pages
      .filter(
        (p) => old.has(p.url) && old.get(p.url).fingerprint !== p.fingerprint,
      )
      .map((p) => p.url),
    removed: [...old.keys()].filter((url) => !present.has(url)),
  };
}

async function response(fetcher, url, options = {}) {
  return fetcher(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(25_000),
    ...options,
  });
}

async function liveText(fetcher, url) {
  const res = await response(fetcher, url);
  if (res.status !== 200)
    throw new Error(`Live verification failed (${res.status}): ${url}`);
  return { res, text: await res.text() };
}

export async function verifyLive(manifest, changes, fetcher = fetch) {
  const proof = await liveText(fetcher, proofUrl);
  if (proof.text.trim() !== indexNow.key)
    throw new Error('Live IndexNow ownership file does not match');
  for (const [file, hash] of [
    ['robots.txt', manifest.robotsSha256],
    ['sitemap.xml', manifest.sitemapSha256],
  ]) {
    const live = await liveText(fetcher, `${indexNow.origin}/${file}`);
    if (digest(live.text) !== hash)
      throw new Error(`Live ${file} differs from this build`);
  }
  const byUrl = new Map(manifest.pages.map((p) => [p.url, p]));
  const work = [...changes.added, ...changes.updated, ...changes.removed];
  const currentUrls = new Set(byUrl.keys());
  const images = new Map();
  for (const url of [...changes.added, ...changes.updated])
    for (const image of byUrl.get(url).images)
      images.set(image.url, image.sha256);
  let cursor = 0;
  // Bound traffic to WHC; all checks finish before a notification can be posted.
  await Promise.all(
    Array.from({ length: Math.min(4, work.length) }, async () => {
      while (cursor < work.length) {
        const url = work[cursor++];
        if (byUrl.has(url)) {
          const live = await liveText(fetcher, url);
          if (
            !live.res.headers.get('content-type')?.includes('text/html') ||
            /noindex|none/i.test(live.res.headers.get('x-robots-tag') ?? '')
          )
            throw new Error(`Live page is not indexable HTML: ${url}`);
          if (digest(live.text) !== byUrl.get(url).sha256)
            throw new Error(`Live page differs from this build: ${url}`);
          inspectHtml(live.text, url, true);
        } else {
          const res = await response(fetcher, url);
          const target = res.headers.get('location');
          const permanentRedirect =
            [301, 308].includes(res.status) &&
            target &&
            currentUrls.has(new URL(target, url).href);
          if (![404, 410].includes(res.status) && !permanentRedirect)
            throw new Error(
              `Removed page is still live or has an invalid redirect: ${url}`,
            );
          await res.body?.cancel();
        }
      }
    }),
  );
  const imageList = [...images];
  cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(4, imageList.length) }, async () => {
      while (cursor < imageList.length) {
        const [url, hash] = imageList[cursor++];
        const res = await response(fetcher, url);
        if (
          res.status !== 200 ||
          digest(Buffer.from(await res.arrayBuffer())) !== hash
        )
          throw new Error(`Live image differs from this build: ${url}`);
      }
    }),
  );
}

export async function submitRelease({
  manifest,
  previous = null,
  bootstrap = false,
  fetcher = fetch,
  saveState,
}) {
  const changes = changesSince(manifest, previous);
  const urlList = [...changes.added, ...changes.updated, ...changes.removed];
  if (!urlList.length) return { outcome: 'unchanged', submitted: 0, changes };
  if (!previous && !bootstrap)
    throw new Error(
      'First submission requires --bootstrap; check the dry-run URL list first',
    );
  if (urlList.length > 10_000)
    throw new Error('Release exceeds the 10,000-URL IndexNow batch limit');
  await verifyLive(manifest, changes, fetcher);
  const res = await response(fetcher, indexNow.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(indexNow.origin).hostname,
      key: indexNow.key,
      keyLocation: proofUrl,
      urlList,
    }),
  });
  const receipt = {
    submittedAt: new Date().toISOString(),
    endpoint: indexNow.endpoint,
    status: res.status,
    submitted: urlList.length,
    outcome:
      res.status === 200
        ? 'received'
        : res.status === 202
          ? 'received-key-validation-pending'
          : 'rejected',
    changes,
  };
  const responseDetail = (await res.text()).trim().slice(0, 1000);
  if (![200, 202].includes(res.status)) {
    const wait = res.headers.get('retry-after');
    throw new Error(
      `IndexNow returned ${res.status}; state unchanged.${wait ? ` Retry-After: ${wait}.` : ''}${responseDetail ? ` Provider response: ${responseDetail}` : ''} Inspect the response status before retrying.`,
    );
  }
  // Save only after the endpoint receives the entire batch. Receipt never claims indexing.
  await saveState({ ...manifest, receipt });
  return receipt;
}
