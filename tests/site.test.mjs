import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { load } from 'cheerio';
const root = path.resolve('dist');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((item) =>
      item.isDirectory()
        ? walk(path.join(dir, item.name))
        : [path.join(dir, item.name)],
    );
const pages = walk(root)
  .filter((file) => file.endsWith('.html'))
  .map((file) => path.relative(root, file));
const parsed = new Map(pages.map((page) => [page, load(read(page))]));
for (const page of pages) {
  test(`${page}: semantic structure, assets and local destinations`, () => {
    const $ = parsed.get(page);
    assert.equal($('h1').length, 1);
    assert.equal($('main').length, 1);
    assert.ok($('html').attr('lang'));
    assert.ok($('meta[name="viewport"]').length);
    const ids = $('[id]')
      .toArray()
      .map((el) => $(el).attr('id'));
    assert.equal(new Set(ids).size, ids.length, 'duplicate IDs');
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      assert.ok(href && href !== '#', 'empty link');
      assert.ok(
        $(el).text().trim() || $(el).attr('aria-label'),
        'unnamed link',
      );
      if (/^(https?:|mailto:|tel:)/.test(href)) return;
      const [pathname, hash] = href.split('#');
      let target = pathname ? path.join(root, pathname) : path.join(root, page);
      if (pathname.endsWith('/')) target = path.join(target, 'index.html');
      assert.ok(fs.existsSync(target), `missing route ${href}`);
      if (hash) {
        const targetPage = parsed.get(path.relative(root, target));
        assert.ok(
          targetPage(`[id="${hash}"]`).length,
          `missing anchor ${href}`,
        );
      }
    });
    $('img').each((_, el) => {
      assert.notEqual($(el).attr('alt'), undefined, 'image needs alt');
      assert.ok(
        $(el).attr('width') && $(el).attr('height'),
        'image dimensions required',
      );
    });
    $('img[src],script[src],link[href]').each((_, el) => {
      const url = $(el).attr('src') || $(el).attr('href');
      if (url.startsWith('/'))
        assert.ok(fs.existsSync(path.join(root, url)), `missing asset ${url}`);
    });
  });
}
for (const lang of ['en', 'fr']) {
  test(`${lang}: locale, navigation, contact and prelaunch guardrails`, () => {
    const $ = load(read(`${lang}/index.html`));
    assert.equal($('html').attr('lang'), `${lang}-CA`);
    assert.equal(
      $('link[rel="canonical"]').attr('href'),
      `https://defibrillators.ca/${lang}/`,
    );
    for (const locale of ['en', 'fr']) {
      assert.equal(
        $(`link[hreflang="${locale}-CA"]`).attr('href'),
        `https://defibrillators.ca/${locale}/`,
      );
      assert.ok($(`.locale-switch a[href="/${locale}/"]`).length);
    }
    assert.equal(
      $('.locale-switch [aria-current="page"]').attr('href'),
      `/${lang}/`,
    );
    assert.equal($('.desktop-nav li').length, 8);
    assert.equal($('.mobile-nav nav li').length, 8);
    assert.equal($('.service-card').length, 4);
    assert.equal($('.faq-list details').length, 4);
    assert.ok($('a[href="tel:+18336969996"]').length);
    assert.ok($('a[href^="mailto:info@defibrillators.ca?subject="]').length);
    assert.equal($('form').length, 0, 'no unconfigured form should be exposed');
    assert.match($('meta[name="robots"]').attr('content'), /noindex/);
    assert.equal($('.skip-link').attr('href'), '#main');
    assert.equal($('#main').attr('tabindex'), '-1');
    assert.equal($('.photo-credits li').length, 6);
    assert.ok($('meta[name="description"]').attr('content').length > 60);
  });
}
test('Homepage navigation leads to localized page routes', () => {
  for (const lang of ['en', 'fr']) {
    const $ = parsed.get(lang + '/index.html');
    assert.ok(
      $('.desktop-nav a')
        .toArray()
        .every((el) =>
          $(el)
            .attr('href')
            .startsWith('/' + lang + '/'),
        ),
    );
    assert.equal(
      new Set(
        $('.desktop-nav a')
          .toArray()
          .map((el) => $(el).attr('href')),
      ).size,
      8,
    );
  }
});
test('Asset size budget and standalone vector brand variants', () => {
  for (const file of fs.readdirSync('public/images')) {
    assert.ok(
      fs.statSync(`public/images/${file}`).size < 150_000,
      `${file} exceeds image budget`,
    );
  }
  for (const mode of ['light', 'dark'])
    for (const lang of ['en', 'fr']) {
      const svg = fs.readFileSync(
        `public/brand/logo-${lang}-${mode}.svg`,
        'utf8',
      );
      assert.ok(svg.includes('<path'));
      assert.ok(svg.includes('<title'));
      assert.ok(!svg.includes('<text'), 'font-independent outlines');
      assert.ok(!svg.includes('<image'), 'no embedded raster logo');
    }
});
test('Core text palette meets WCAG AA contrast', () => {
  const luminance = (hex) =>
    hex
      .match(/\w\w/g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  for (const [a, b] of [
    ['102B4E', 'FFFFFF'],
    ['D62839', 'FFFFFF'],
    ['506278', 'F5F8FB'],
    ['CFDAE7', '09213E'],
    ['D7E2EF', '09213E'],
  ]) {
    const x = luminance(a),
      y = luminance(b);
    assert.ok(
      (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05) >= 4.5,
      `${a}/${b}`,
    );
  }
});
test('Master prompt remains exactly the audited Git blob', () => {
  const body = fs.readFileSync('MASTER_PROMPT.md');
  const sha = crypto
    .createHash('sha1')
    .update(`blob ${body.length}\0`)
    .update(body)
    .digest('hex');
  assert.equal(sha, '68e473cd39ee68b3b97f20369d8587fdb57835ab');
});
