import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  buildManifest,
  canonicalUrl,
  changesSince,
  submitRelease,
} from '../scripts/lib/indexnow.mjs';
import { indexNow } from '../scripts/lib/indexnow-config.mjs';
import { routes } from '../src/data/routes.ts';

async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dfca-indexnow-'));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const live = new Map();
  async function file(name, body, type = 'text/plain') {
    await fs.mkdir(path.dirname(path.join(dir, name)), { recursive: true });
    await fs.writeFile(path.join(dir, name), body);
    live.set(indexNow.origin + '/' + name.replace(/index\.html$/, ''), {
      body,
      type,
    });
  }
  await file(
    'robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${indexNow.origin}/sitemap.xml\n`,
  );
  await file(
    'sitemap.xml',
    `<urlset>${['en', 'fr'].map((lang) => `<url><loc>${indexNow.origin}/${lang}/</loc></url>`).join('')}</urlset>`,
    'application/xml',
  );
  await file(`${indexNow.key}.txt`, indexNow.key + '\n');
  await file('images/example.webp', 'sample-image', 'image/webp');
  for (const lang of ['en', 'fr'])
    await file(
      `${lang}/index.html`,
      `<html lang="${lang}"><head><link rel="canonical" href="${indexNow.origin}/${lang}/"><meta name="robots" content="index, follow"></head><body><main><h1>${lang}</h1><img src="/images/example.webp" alt="Example"></main></body></html>`,
      'text/html',
    );
  let posted = [],
    saved = [],
    status = 200;
  const fetcher = async (url, options) => {
    assert.equal(options.redirect, 'manual');
    assert.ok(options.signal);
    if (url === indexNow.endpoint) {
      posted.push(JSON.parse(options.body));
      assert.equal(options.method, 'POST');
      return new Response('', { status, headers: { 'retry-after': '60' } });
    }
    const value = live.get(url);
    return new Response(value?.body ?? '', {
      status: value?.status ?? (value ? 200 : 404),
      headers: {
        'content-type': value?.type ?? 'text/plain',
        ...value?.headers,
      },
    });
  };
  return {
    dir,
    live,
    file,
    fetcher,
    posted,
    saved,
    setStatus: (value) => (status = value),
    saveState: async (state) => saved.push(state),
    manifest: await buildManifest(dir),
  };
}

test('Built release includes both languages, excludes assets/queries, and keeps IndexNow out of browser code', async () => {
  const manifest = await buildManifest();
  assert.equal(manifest.pages.length, Object.keys(routes).length * 2);
  assert.equal(
    manifest.pages.filter((p) => p.url.includes('/fr/')).length,
    Object.keys(routes).length,
  );
  assert.equal(manifest.indexable, true);
  assert.match(indexNow.key, /^[a-f0-9]{32}$/);
  assert.equal(
    (await fs.readFile(`dist/${indexNow.key}.txt`, 'utf8')).trim(),
    indexNow.key,
  );
  for (const page of manifest.pages) {
    const html = await fs.readFile(
      path.join('dist', new URL(page.url).pathname, 'index.html'),
      'utf8',
    );
    assert.doesNotMatch(
      html,
      new RegExp(indexNow.key + '|api\\.indexnow\\.org'),
    );
  }
  const dry = spawnSync(process.execPath, ['scripts/indexnow.mjs'], {
    encoding: 'utf8',
  });
  assert.equal(dry.status, 0, dry.stderr);
  assert.equal(JSON.parse(dry.stdout).networkRequests, 0);
});

test('Only added, edited and removed URLs are selected; image-only edits are detected', async (t) => {
  const f = await fixture(t),
    old = f.manifest;
  assert.deepEqual(changesSince(old, old), {
    added: [],
    updated: [],
    removed: [],
  });
  await f.file('images/example.webp', 'new-image', 'image/webp');
  const next = await buildManifest(f.dir);
  assert.equal(next.pages[0].sha256, old.pages[0].sha256);
  assert.equal(changesSince(next, old).updated.length, 2);
  const different = structuredClone(old);
  different.pages[1].url = indexNow.origin + '/fr/nouveau/';
  const change = changesSince(different, old);
  assert.deepEqual(change.added, [indexNow.origin + '/fr/nouveau/']);
  assert.deepEqual(change.removed, [indexNow.origin + '/fr/']);
});

test('Reject foreign, duplicate, noncanonical, query and staging URLs before making requests', async (t) => {
  const f = await fixture(t);
  for (const url of [
    'https://example.com/en/',
    indexNow.origin + '/en/?email=x',
    indexNow.origin + '/en/#x',
    indexNow.origin + '/',
    indexNow.origin + '/en/index.html',
    'http://defibrillators.ca/en/',
    indexNow.origin + '/en/../fr/',
  ])
    assert.throws(() => canonicalUrl(url));
  assert.throws(
    () => changesSince({ ...f.manifest, indexable: false }),
    /Staging/,
  );
  assert.throws(
    () =>
      changesSince({
        ...f.manifest,
        pages: [f.manifest.pages[0], f.manifest.pages[0]],
      }),
    /duplicate/,
  );
  await assert.rejects(submitRelease({ ...f, bootstrap: false }), /bootstrap/);
  assert.equal(f.posted.length, 0);
});

for (const status of [200, 202])
  test(`IndexNow ${status} records receipt; repeat deployment makes no network requests`, async (t) => {
    const f = await fixture(t);
    f.setStatus(status);
    const receipt = await submitRelease({ ...f, bootstrap: true });
    assert.equal(receipt.status, status);
    assert.equal(receipt.submitted, 2);
    assert.equal(f.saved.length, 1);
    assert.deepEqual(
      f.posted[0].urlList,
      f.manifest.pages.map((p) => p.url),
    );
    assert.equal(f.posted[0].host, 'defibrillators.ca');
    assert.equal(
      f.posted[0].keyLocation,
      `${indexNow.origin}/${indexNow.key}.txt`,
    );
    assert.equal(
      receipt.outcome,
      status === 200 ? 'received' : 'received-key-validation-pending',
    );
    const repeated = await submitRelease({
      ...f,
      previous: f.saved[0],
      fetcher: () => {
        throw new Error('No repeat request allowed');
      },
    });
    assert.equal(repeated.outcome, 'unchanged');
    assert.equal(f.saved.length, 1);
  });

for (const failure of [
  'proof',
  'sitemap',
  'robots',
  'html',
  'image',
  'redirect',
  'noindex',
])
  test(`Unpublished or blocked ${failure} prevents notification and state advancement`, async (t) => {
    const f = await fixture(t),
      base = indexNow.origin;
    if (failure === 'proof')
      f.live.set(`${base}/${indexNow.key}.txt`, { body: 'wrong' });
    if (failure === 'sitemap')
      f.live.set(`${base}/sitemap.xml`, { body: '<urlset />' });
    if (failure === 'robots')
      f.live.set(`${base}/robots.txt`, { body: 'User-agent: *\nDisallow: /' });
    if (failure === 'html')
      f.live.get(`${base}/en/`).body += '<p>old deployment</p>';
    if (failure === 'image')
      f.live.get(`${base}/images/example.webp`).body = 'old-image';
    if (failure === 'redirect') f.live.get(`${base}/en/`).status = 302;
    if (failure === 'noindex')
      f.live.get(`${base}/en/`).headers = { 'x-robots-tag': 'noindex' };
    await assert.rejects(submitRelease({ ...f, bootstrap: true }));
    assert.equal(f.posted.length, 0);
    assert.equal(f.saved.length, 0);
  });

for (const status of [400, 403, 422, 429, 500])
  test(`IndexNow ${status} is not retried automatically and leaves previous state unchanged`, async (t) => {
    const f = await fixture(t);
    f.setStatus(status);
    await assert.rejects(
      submitRelease({ ...f, bootstrap: true }),
      new RegExp(`returned ${status}`),
    );
    assert.equal(f.posted.length, 1);
    assert.equal(f.saved.length, 0);
  });

test('Removed pages require a real 404/410 or permanent redirect to a current canonical URL', async (t) => {
  const f = await fixture(t);
  const previous = structuredClone(f.manifest);
  const oldUrl = indexNow.origin + '/en/retired/';
  previous.pages.push({ ...previous.pages[0], url: oldUrl });
  f.live.set(oldUrl, { body: 'stale page', type: 'text/html' });
  await assert.rejects(
    submitRelease({ ...f, previous }),
    /Removed page is still live/,
  );
  f.live.set(oldUrl, {
    status: 301,
    headers: { location: indexNow.origin + '/en/' },
  });
  const receipt = await submitRelease({ ...f, previous });
  assert.deepEqual(receipt.changes.removed, [oldUrl]);
  assert.deepEqual(f.posted[0].urlList, [oldUrl]);
});

test('Build rejects a sitemap/canonical mismatch and marks staging as non-submittable', async (t) => {
  const f = await fixture(t);
  await f.file('robots.txt', 'User-agent: *\nDisallow: /\n');
  const staging = await buildManifest(f.dir);
  assert.equal(staging.indexable, false);
  assert.throws(() => changesSince(staging), /Staging/);
  await f.file(
    'en/index.html',
    '<html><head><link rel="canonical" href="https://wrong.example/en/"></head></html>',
  );
  await assert.rejects(buildManifest(f.dir), /Canonical mismatch/);
});
