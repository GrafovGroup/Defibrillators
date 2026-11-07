import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { load } from 'cheerio';
import { visuals, pageVisuals, visualCaption } from '../src/data/visuals.ts';
import { pages } from '../src/data/pages.ts';
import { products } from '../src/data/products.ts';
import {
  pathFor,
  serviceIds,
  accessoryIds,
  industryIds,
} from '../src/data/routes.ts';
import { offeringIds } from '../src/data/offering-routes.ts';

test('Every product, service, accessory and industry has its own unique visual', () => {
  const required = [
    ...products.map((p) => p.id),
    ...serviceIds,
    ...accessoryIds,
    ...industryIds,
    ...offeringIds,
    'parts',
    'packages',
    'compare',
  ];
  for (const id of required)
    assert.ok(pageVisuals[id], `Missing imagery: ${id}`);
  const keys = Object.values(pageVisuals);
  assert.equal(
    new Set(keys).size,
    keys.length,
    'Unrelated page subjects must not reuse a hero',
  );
  const hashes = keys.map((key) =>
    createHash('sha256')
      .update(fs.readFileSync('public' + visuals[key].src))
      .digest('hex'),
  );
  assert.equal(
    new Set(hashes).size,
    hashes.length,
    'Renaming the same image is not distinct imagery',
  );
  for (const page of pages) {
    if (!page.location && page.image) assert.ok(visuals[page.image], page.id);
  }
});

test('Responsive images decode at their declared dimensions and meet transfer budgets', async () => {
  for (const [key, visual] of Object.entries(visuals)) {
    assert.ok(visual.variants.length >= 2, key);
    assert.ok(visual.alt.en.length > 25 && visual.alt.fr.length > 25, key);
    assert.notEqual(visual.alt.en, visual.alt.fr, key);
    for (const variant of visual.variants) {
      const bytes = fs.readFileSync('public' + variant.src);
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, 'webp');
      assert.equal(metadata.width, variant.width, variant.src);
      assert.equal(metadata.height, variant.height, variant.src);
      assert.ok(bytes.length < 150_000, variant.src);
      if (variant.width <= 400) assert.ok(bytes.length < 45_000, variant.src);
    }
  }
});

for (const lang of ['en', 'fr']) {
  test(`${lang}: all enriched pages render accessible responsive heroes and matching search images`, () => {
    for (const [id, key] of Object.entries(pageVisuals)) {
      const $ = load(
        fs.readFileSync('dist' + pathFor(id, lang) + 'index.html', 'utf8'),
      );
      const visual = visuals[key],
        img = $('.page-hero img');
      assert.equal(img.length, 1, id);
      assert.equal(img.attr('src'), visual.src, id);
      assert.equal(img.attr('alt'), visual.alt[lang], id);
      assert.equal(img.attr('loading'), 'eager', id);
      assert.equal(img.attr('fetchpriority'), 'high', id);
      assert.equal(
        img.attr('srcset').split(',').length,
        visual.variants.length,
        id,
      );
      assert.equal(
        $('.page-hero figcaption').text().trim(),
        visualCaption(visual, lang),
        id,
      );
      const largest = visual.variants.at(-1);
      assert.equal(
        $('meta[property="og:image"]').attr('content'),
        'https://defibrillators.ca' + largest.src,
        id,
      );
      assert.equal(
        $('meta[property="og:image:alt"]').attr('content'),
        visual.alt[lang],
        id,
      );
      const graph = JSON.parse($('script[type="application/ld+json"]').text())[
        '@graph'
      ];
      const image = graph.find((n) => n['@type'] === 'ImageObject');
      assert.equal(
        image.contentUrl,
        'https://defibrillators.ca' + largest.src,
        id,
      );
      assert.equal(image.caption, visual.alt[lang], id);
      if (visual.kind === 'context') {
        assert.equal(
          graph.find((n) => n['@type'] === 'Product').image,
          undefined,
        );
        assert.equal(
          products.find((p) => p.id === id).image,
          null,
          'Context is not device photography',
        );
      }
    }
  });
  test(`${lang}: catalogue and homepage previews are distinct, local and lazy loaded`, () => {
    for (const id of ['home', 'defibrillators']) {
      const $ = load(
        fs.readFileSync('dist' + pathFor(id, lang) + 'index.html', 'utf8'),
      );
      const images = $(
        id === 'home' ? '.service-card img' : '.product-card img',
      );
      assert.equal(images.length, id === 'home' ? 4 : 8);
      assert.equal(
        new Set(images.toArray().map((el) => $(el).attr('src'))).size,
        images.length,
      );
      images.each((_, el) => {
        assert.equal($(el).attr('loading'), 'lazy');
        assert.ok($(el).attr('srcset'));
        assert.ok($(el).attr('alt').length > 25);
      });
    }
  });
}
