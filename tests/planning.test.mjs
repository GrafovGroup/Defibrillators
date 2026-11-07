import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';
import { routes, pathFor } from '../src/data/routes.ts';
import { modelIds, modelOptions } from '../src/data/model-options.ts';
import { pageVisuals } from '../src/data/visuals.ts';
import { products } from '../src/data/products.ts';
import { safeEnquiryParams } from '../src/lib/enquiry-context.ts';
import { enquiryPath } from '../src/lib/enquiry.ts';
import { validateRfq, submitRfq, formEndpoint } from '../src/lib/rfq.ts';
const html = (id, lang) =>
  load(fs.readFileSync(`dist${pathFor(id, lang)}index.html`, 'utf8'));
const graph = ($) =>
  JSON.parse($('script[type="application/ld+json"]').text())['@graph'];
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
const valid = () => {
  const data = new FormData();
  for (const [k, v] of Object.entries({
    name: 'Test Person',
    email: 'qa@example.com',
    province: 'ON',
    audience: 'residential',
    request_type: 'equipment',
    model: 'discuss',
    installation: 'discuss',
    maintenance: 'discuss',
    message: 'A synthetic project enquiry.',
  }))
    data.set(k, v);
  return data;
};
test('Eight distinct model references use official sources and no unlicensed images', () => {
  assert.equal(products.length, 8);
  assert.deepEqual(products.map((p) => p.id).sort(), [...modelIds].sort());
  for (const p of products) {
    assert.match(
      p.source.url,
      /^https:\/\/(candistributor\.zoll\.com|www\.zoll\.com|www\.usa\.philips\.com|www\.stryker\.com|www\.defibtech\.com|heartsine\.com)\//,
    );
    for (const lang of ['en', 'fr']) {
      const $ = html(p.id, lang);
      assert.ok($(`main a[href="${p.source.url}"]`).length);
      assert.ok($('.product-source').text().includes(p.source.reviewed));
      assert.equal(
        graph($).find((n) => n['@type'] === 'Product').name,
        $('h1').text(),
      );
      assert.equal($('.page-hero img').length, pageVisuals[p.id] ? 1 : 0);
      assert.equal(
        new URL(
          enquiryPath(p.id, lang),
          'https://defibrillators.ca',
        ).searchParams.get('model'),
        p.id,
      );
    }
  }
});
for (const lang of ['en', 'fr']) {
  test(`${lang}: model-first parts finder has a native GET fallback and all reference notes`, () => {
    const $ = html('parts', lang),
      form = $('form');
    assert.equal(form.attr('method'), 'get');
    assert.equal(form.attr('action'), pathFor('quote', lang) + '#rfq');
    assert.equal(form.find('[name=request]').attr('value'), 'accessories');
    assert.equal(form.find('[name=source]').attr('value'), 'parts');
    assert.equal(form.find('[name=model] option').length, modelIds.length + 2);
    assert.equal($('[data-parts-model]:not([hidden])').length, modelIds.length);
    assert.ok($('noscript').text().length > 50);
    for (const id of modelIds)
      assert.equal(form.find(`option[value=${id}]`).length, 1);
  });
  test(`${lang}: package links preserve scope and the simpler home request`, () => {
    const $ = html('packages', lang),
      links = $('.planning-card .button').toArray();
    assert.equal(links.length, 4);
    for (const link of links) {
      const url = new URL($(link).attr('href'), 'https://defibrillators.ca');
      assert.equal(url.pathname, pathFor('quote', lang));
      assert.equal(url.hash, '#rfq');
      assert.equal(url.searchParams.get('source'), 'packages');
      assert.ok(
        ['workplace', 'home', 'mobile', 'multisite'].includes(
          url.searchParams.get('package'),
        ),
      );
      assert.equal(
        url.searchParams.get('request'),
        url.searchParams.get('package') === 'multisite'
          ? 'programs'
          : 'equipment',
      );
      assert.equal(
        url.searchParams.get('audience'),
        url.searchParams.get('package') === 'home' ? 'residential' : null,
      );
    }
  });
  test(`${lang}: catalogue filters have unique options and comparison keeps all columns in static HTML`, () => {
    const $ = html('defibrillators', lang);
    const brands = $('#brand-filter option')
      .toArray()
      .map((e) => $(e).attr('value'));
    assert.equal(brands.length, new Set(brands).size);
    assert.equal(
      $('#environment-filter,#type-filter').length,
      0,
      'No filters advertising unverified environments or empty accessory inventory',
    );
    assert.equal($('#guidance-filter option').length, 4);
    const c = html('compare', lang);
    assert.equal(c('[data-comparison-controls][hidden]').length, 1);
    assert.equal(c('[data-compare-select]').length, 2);
    for (const id of modelIds)
      assert.equal(c(`th[data-compare-model=${id}]`).length, 1);
  });
  test(`${lang}: guide articles have visible source, author, dates, answers and working contents links`, () => {
    for (const id of ['buying', 'care', 'costs']) {
      const $ = html(id, lang),
        article = graph($).find((n) => n['@type'] === 'Article');
      assert.ok(article);
      assert.equal(article.dateModified, $('time').attr('datetime'));
      assert.equal(article.headline, $('h1').text());
      assert.equal(article.description, normalize($('.guide-answer p').text()));
      assert.ok($('.guide-byline a').text().includes('Defibrillators.ca'));
      for (const url of article.citation)
        assert.ok($(`#guide-sources a[href="${url}"]`).length);
      for (const link of $('.guide-toc a').toArray())
        assert.equal($($(link).attr('href')).length, 1);
      const faqs = graph($).find((n) => n['@type'] === 'FAQPage').mainEntity;
      assert.equal(faqs.length, $('#guide-questions details').length);
      for (const faq of faqs)
        assert.ok(
          normalize($('#guide-questions').text()).includes(
            normalize(faq.acceptedAnswer.text),
          ),
        );
    }
  });
  test(`${lang}: collection schema points to visible catalogue and category links`, () => {
    for (const id of [
      'defibrillators',
      'accessories',
      'services',
      'resources',
    ]) {
      const $ = html(id, lang),
        g = graph($);
      assert.ok(g.find((n) => n['@type'] === 'CollectionPage'));
      const list = g.find((n) => n['@type'] === 'ItemList');
      assert.equal(list.numberOfItems, list.itemListElement.length);
      for (const item of list.itemListElement)
        assert.ok($(`main a[href="${new URL(item.url).pathname}"]`).length);
    }
  });
  test(`${lang}: enquiry includes every model and request-specific fields without mandatory extras`, () => {
    const $ = html('quote', lang);
    for (const form of $('[data-rfq]').toArray()) {
      const f = $(form);
      for (const model of modelOptions)
        assert.equal(
          f.find(`[name=model] option[value=${model.id}]`).length,
          1,
        );
      for (const field of [
        'package',
        'accessory_type',
        'part_reference',
        'training_participants',
        'training_course',
        'training_format',
        'training_language',
      ]) {
        assert.equal(f.find(`[name=${field}]`).length, 1);
        assert.equal(f.find(`[name=${field}][required]`).length, 0);
      }
    }
  });
}
test('Enquiry context accepts only known choices and never propagates contact data or arbitrary URLs', () => {
  const safe = safeEnquiryParams(
    new URLSearchParams(
      'model=frx&request=accessories&part=refresh&source=parts&audience=residential&email=private%40example.com&message=private&redirect=https://example.com',
    ),
  );
  assert.deepEqual(Object.fromEntries(safe), {
    audience: 'residential',
    model: 'frx',
    request: 'accessories',
    source: 'parts',
    part: 'refresh',
  });
  for (const key of [
    'model',
    'request',
    'source',
    'package',
    'part',
    'audience',
  ])
    assert.equal(
      safeEnquiryParams(new URLSearchParams({ [key]: '__proto__' })).size,
      0,
    );
  assert.equal(
    safeEnquiryParams(
      new URLSearchParams(
        'model=%3Cscript%3E&source=constructor&package=unknown',
      ),
    ).size,
    0,
  );
  assert.equal(
    safeEnquiryParams(new URLSearchParams('model=cr2&model=frx')).get('model'),
    'cr2',
  );
});
test('New model and planning values validate, with bounded optional part and training fields', () => {
  for (const model of modelIds) {
    const data = valid();
    data.set('model', model);
    assert.deepEqual(validateRfq(data, 'en'), {});
  }
  const data = valid();
  for (const [key, value] of Object.entries({
    package: 'home',
    accessory_type: 'refresh',
    part_reference: 'EXAMPLE-PART-123',
    training_language: 'fr',
    training_format: 'blended',
    training_course: 'renewal',
    training_participants: '12',
  }))
    data.set(key, value);
  assert.deepEqual(validateRfq(data, 'fr'), {});
  data.set('training_participants', '0');
  data.set('accessory_type', 'arbitrary');
  data.set('part_reference', 'x'.repeat(101));
  const errors = validateRfq(data, 'fr');
  assert.ok(errors.training_participants);
  assert.ok(errors.accessory_type);
  assert.ok(errors.part_reference);
  assert.ok(Object.keys(routes).includes('parts'));
});

test('Optional planning details reach the configured transport unchanged', async () => {
  const data = valid();
  data.set('request_type', 'accessories');
  data.set('model', 'frx');
  data.set('accessory_type', 'refresh');
  data.set('part_reference', 'SYNTHETIC-PART');
  data.set('locale', 'fr');
  const result = await submitRfq(data, 'fr', async (url, options) => {
    assert.equal(url, formEndpoint);
    assert.equal(options.method, 'POST');
    assert.equal(options.body.get('model'), 'frx');
    assert.equal(options.body.get('accessory_type'), 'refresh');
    assert.equal(options.body.get('part_reference'), 'SYNTHETIC-PART');
    assert.equal(options.body.get('locale'), 'fr');
    return Response.json({ ok: true });
  });
  assert.deepEqual(result, { kind: 'success' });
});
