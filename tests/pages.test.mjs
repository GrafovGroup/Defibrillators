import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
import { matchesProduct } from '../src/scripts/catalogue-filter.ts';
const root = path.resolve('dist');
const htmlAt = (url) =>
  load(
    fs.readFileSync(
      path.join(
        root,
        new URL(url, 'https://defibrillators.ca').pathname,
        'index.html',
      ),
      'utf8',
    ),
  );
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((item) =>
      item.isDirectory()
        ? walk(path.join(dir, item.name))
        : [path.join(dir, item.name)],
    );
const localized = walk(root).filter(
  (file) => /\/(en|fr)\//.test(file) && file.endsWith('/index.html'),
);
const all = new Map(
  localized.map((file) => [file, load(fs.readFileSync(file, 'utf8'))]),
);
for (const [file, $] of all) {
  const relative = path.relative(root, file);
  const lang = relative.split('/')[0];
  test(`${relative}: localized metadata, consistent navigation and reachable language pair`, () => {
    assert.equal($('html').attr('lang'), `${lang}-CA`);
    assert.equal(
      $('link[rel="canonical"]').attr('href'),
      `https://defibrillators.ca/${relative.replace('index.html', '')}`,
    );
    const current = $('link[rel="canonical"]').attr('href');
    for (const alternate of ['en', 'fr']) {
      const target = $(`link[hreflang="${alternate}-CA"]`).attr('href');
      assert.ok(target);
      const paired = htmlAt(target);
      assert.equal(paired('html').attr('lang'), `${alternate}-CA`);
      assert.equal(
        paired(`link[hreflang="${lang}-CA"]`).attr('href'),
        current,
        'reciprocal hreflang',
      );
      assert.equal(
        $(`.locale-switch a[hreflang="${alternate}-CA"]`).attr('href'),
        new URL(target).pathname,
        'switch must keep page identity',
      );
    }
    assert.equal(
      $('.locale-switch [aria-current="page"]').attr('href'),
      new URL(current).pathname,
    );
    const home = htmlAt(`/${lang}/`);
    for (const selector of ['.desktop-nav a', '.mobile-nav nav a']) {
      assert.deepEqual(
        $(selector)
          .toArray()
          .map((el) => [$(el).text().trim(), $(el).attr('href')]),
        home(selector)
          .toArray()
          .map((el) => [home(el).text().trim(), home(el).attr('href')]),
        'stable navigation',
      );
    }
    if (relative !== `${lang}/index.html`) {
      assert.equal(
        $('.breadcrumbs [aria-current="page"]').text().trim(),
        $('h1').text().trim(),
      );
    }
    assert.ok($('meta[name="description"]').attr('content').length > 60);
    assert.match($('meta[name="robots"]').attr('content'), /noindex/);
    assert.equal(
      $('script[type="application/ld+json"]').length,
      0,
      'no fabricated product offers or ratings',
    );
    assert.equal(
      $('form').length,
      /request-quote|demander-soumission/.test(relative) ? 2 : 0,
    );
    $('form').each((_, el) =>
      assert.equal($(el).attr('action'), 'https://formspree.io/f/maeezonn'),
    );
  });
}
test('Phase 1B route coverage and unique metadata', () => {
  assert.equal(
    localized.length,
    72,
    '36 pages per locale including the homepage',
  );
  const titles = [...all.values()].map(($) => $('title').text());
  assert.equal(new Set(titles).size, titles.length);
  const descriptions = [...all.values()].map(($) =>
    $('meta[name="description"]').attr('content'),
  );
  assert.equal(new Set(descriptions).size, descriptions.length);
  for (const [lang, prefix] of [
    ['en', 'industries'],
    ['fr', 'secteurs'],
  ]) {
    assert.equal(
      [...all.keys()].filter(
        (p) =>
          p.includes(`/${lang}/${prefix}/`) &&
          !p.endsWith(`/${prefix}/index.html`),
      ).length,
      9,
    );
  }
  for (const [lang, paths] of [
    [
      'en',
      [
        'accessories/electrode-pads',
        'accessories/batteries',
        'accessories/cabinets',
        'accessories/signage',
        'accessories/emergency-response-kits',
        'installation',
        'maintenance',
        'aed-programs',
        'cpr-aed-training',
        'about',
        'contact',
        'request-quote',
        'faqs',
        'resources/aed-buying-guide',
        'resources/aed-maintenance-guide',
        'privacy',
        'terms',
        'accessibility',
      ],
    ],
    [
      'fr',
      [
        'accessoires/electrodes',
        'accessoires/batteries',
        'accessoires/armoires',
        'accessoires/signalisation',
        'accessoires/trousses-intervention',
        'installation',
        'entretien',
        'programmes-dea',
        'formation-rcr-dea',
        'a-propos',
        'contact',
        'demander-soumission',
        'questions-frequentes',
        'ressources/guide-achat-dea',
        'ressources/guide-entretien-dea',
        'confidentialite',
        'conditions',
        'accessibilite',
      ],
    ],
  ])
    for (const route of paths) {
      assert.ok(
        fs.existsSync(path.join(root, lang, route, 'index.html')),
        route,
      );
    }
});
test('Product references expose verification limits and official sources', () => {
  for (const [lang, prefix] of [
    ['en', 'defibrillators'],
    ['fr', 'defibrillateurs'],
  ])
    for (const model of ['zoll-aed-plus', 'philips-heartstart-hs1']) {
      const $ = htmlAt(`/${lang}/${prefix}/${model}/`);
      assert.equal($('.product-status dl>div').length, 3);
      assert.match(
        $('.product-status').text(),
        lang === 'en' ? /Not yet verified/ : /Pas encore vérifiée/,
      );
      assert.ok(
        $('.product-status a')
          .toArray()
          .some((el) => /\.zoll\.com|\.philips\.com/.test($(el).attr('href'))),
      );
      assert.doesNotMatch(
        $('main').text(),
        /\$\s*\d|CAD\s*\d|in stock|en stock/i,
      );
    }
});
test('Catalogue has accessible progressively enhanced filtering', () => {
  for (const route of ['/en/defibrillators/', '/fr/defibrillateurs/']) {
    const $ = htmlAt(route);
    assert.equal($('[data-product]').length, 2);
    assert.equal(
      $('.catalogue-filters[hidden]').length,
      1,
      'JS controls hidden until initialized',
    );
    assert.equal(
      $('[data-product][hidden]').length,
      0,
      'all profiles available without JS',
    );
    assert.equal($('label[for="model-search"]').length, 1);
    assert.equal($('label[for="brand-filter"]').length, 1);
    assert.equal($('[data-count][aria-live="polite"]').length, 1);
  }
});
test('Filter handles combined terms, accents, case, whitespace and empty results', () => {
  assert.equal(
    matchesProduct(
      'ZOLL AED Plus rétroaction adulte',
      'ZOLL',
      '  RETROACTION  adulte  ',
      'ZOLL',
    ),
    true,
  );
  assert.equal(
    matchesProduct('Philips HS1 voice prompts', 'Philips', 'VOICE', 'ZOLL'),
    false,
  );
  assert.equal(
    matchesProduct('Philips HS1 voice prompts', 'Philips', 'unknown', ''),
    false,
  );
  assert.equal(matchesProduct('ZOLL AED Plus', 'ZOLL', '', ''), true);
  assert.equal(matchesProduct('ZOLL AED Plus', 'ZOLL', 'plus zoll', ''), true);
});
test('Comparison exposes row and column headings and a keyboard-scrollable region', () => {
  for (const route of [
    '/en/defibrillators/compare/',
    '/fr/defibrillateurs/comparer/',
  ]) {
    const $ = htmlAt(route);
    assert.equal($('caption').length, 1);
    assert.equal($('thead th[scope="col"]').length, 3);
    assert.equal($('tbody th[scope="row"]').length, 6);
    assert.equal(
      $('.comparison-scroll[tabindex="0"][role="region"]').length,
      1,
    );
  }
});
test('Contextual RFQ links preserve product and service identity', () => {
  const product = htmlAt('/fr/defibrillateurs/zoll-aed-plus/');
  const url = new URL(
    product('.enquiry-actions .button').attr('href'),
    'https://defibrillators.ca',
  );
  assert.equal(url.pathname, '/fr/demander-soumission/');
  assert.equal(url.searchParams.get('model'), 'zoll');
  const service = htmlAt('/en/maintenance/');
  assert.equal(
    new URL(
      service('.enquiry-actions .button').attr('href'),
      'https://defibrillators.ca',
    ).searchParams.get('request'),
    'maintenance',
  );
});
test('Service pages use four distinct relevant photographs', () => {
  for (const routes of [
    [
      '/en/installation/',
      '/en/maintenance/',
      '/en/aed-programs/',
      '/en/cpr-aed-training/',
    ],
    [
      '/fr/installation/',
      '/fr/entretien/',
      '/fr/programmes-dea/',
      '/fr/formation-rcr-dea/',
    ],
  ]) {
    const photos = routes.map((route) =>
      htmlAt(route)('.page-hero img').attr('src'),
    );
    assert.equal(new Set(photos).size, 4);
  }
});
