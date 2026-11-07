import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';
import { searchScore } from '../src/lib/site-search.ts';
import { budgetTotal } from '../src/lib/ownership-budget.ts';
import { pages } from '../src/data/pages.ts';
import { pathFor } from '../src/data/routes.ts';
import { validateRfq } from '../src/lib/rfq.ts';

test('Search handles bilingual terms, accents, product references and compound intent', () => {
  assert.ok(searchScore('AED batteries', 'batteries de DEA', 'batterie'));
  assert.ok(searchScore('Montréal', 'Laval Longueuil', 'montreal'));
  assert.ok(
    searchScore(
      'Philips HeartStart FRx',
      'battery 989803139261',
      'frx battery',
    ),
  );
  assert.ok(
    searchScore('Philips HeartStart FRx', '989803139261', '989803139261'),
  );
  assert.equal(searchScore('Toronto', 'Mississauga', 'Vancouver'), 0);
  assert.equal(searchScore('AED batteries', 'battery', 'pads'), 0);
  assert.ok(
    searchScore('AED battery', 'supplies', 'battery') >
      searchScore('AED supplies', 'battery', 'battery'),
  );
  assert.equal(searchScore('AED pads', 'pads', '<script>alert(1)</script>'), 0);
});
test('Budget sums quoted amounts in cents and rejects invalid or negative values', () => {
  assert.equal(budgetTotal(['0.10', '0.20']), 0.3);
  assert.equal(budgetTotal(['1000.50', '', '20.25', '0']), 1020.75);
  assert.equal(budgetTotal(['', '']), null);
  assert.equal(budgetTotal(['0', '']), 0);
  for (const value of [
    '-2',
    '1.001',
    '1e3',
    'NaN',
    'Infinity',
    '9999999999',
    '<script>',
  ])
    assert.equal(budgetTotal([value]), null);
});
for (const lang of ['en', 'fr']) {
  const html = (id) =>
    load(fs.readFileSync(`dist${pathFor(id, lang)}index.html`, 'utf8'));
  test(`${lang}: all pages are searchable without JavaScript and search has labelled progressive controls`, () => {
    const $ = html('search');
    assert.equal($('[data-search-entry]').length, pages.length - 1);
    assert.equal($('[data-search-entry][hidden]').length, 0);
    assert.equal($('#site-search-input').attr('type'), 'search');
    assert.equal($('label[for=site-search-input]').length, 1);
    assert.equal($('[data-search-count]').attr('role'), 'status');
    assert.ok($('[data-keywords*="989803139261"]').length);
  });
  test(`${lang}: quote action stays on site and request form has a notice without a consent checkbox`, () => {
    const home = html('home');
    assert.equal(
      home('.contact-actions .button').attr('href'),
      pathFor('quote', lang),
    );
    assert.equal(home('.mobile-contact a[href^="tel:"]').length, 1);
    const form = html('quote');
    assert.equal(form('[name=consent]').length, 0);
    assert.equal(form('.rfq-privacy a').length, 2);
    assert.equal(form('[name=privacy_notice_version]').length, 2);
    assert.equal(form('.mobile-contact').length, 0);
  });
  test(`${lang}: operator and mailing address are visible without invented storefront markup`, () => {
    const $ = html('about');
    assert.match($('.business-details').text(), /Superclean Canada Inc\./);
    assert.match($('.business-details address').text(), /PMB # 222/);
    assert.match(
      $('.business-details').text(),
      lang === 'en' ? /Mailing address only/ : /Adresse postale seulement/,
    );
    assert.doesNotMatch(
      $('script[type="application/ld+json"]').text(),
      /LocalBusiness|openingHours|"geo"/,
    );
  });
}
test('An ordinary enquiry validates without a checkbox and never adds manufactured consent', () => {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: 'Test Buyer',
    email: 'buyer@example.com',
    province: 'ON',
    audience: 'residential',
    request_type: 'equipment',
    message: 'Please quote one AED.',
  }))
    data.set(key, value);
  assert.deepEqual(validateRfq(data, 'en'), {});
  assert.equal(data.has('consent'), false);
});
