import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { routes, pathFor } from '../src/data/routes.ts';
import { modelIds } from '../src/data/model-options.ts';
import { locationGuides } from '../src/data/locations.ts';
import { provinceForLocation } from '../src/data/location-routes.ts';
import {
  searchConfiguration,
  searchConfig,
  robotsText,
  safeJson,
} from '../src/lib/site-config.ts';

const origin = 'https://defibrillators.ca';
const html = (url) =>
  load(fs.readFileSync(path.join('dist', url, 'index.html'), 'utf8'));
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
const graphOf = ($) =>
  JSON.parse($('script[type="application/ld+json"]').text())['@graph'];
const walk = (value) =>
  typeof value !== 'object' || value === null
    ? []
    : [value, ...Object.values(value).flatMap(walk)];

test('Sitemap contains each canonical destination exactly once and excludes query/404 URLs', () => {
  const xml = fs.readFileSync('dist/sitemap.xml', 'utf8');
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
  const $ = load(xml, { xmlMode: true });
  assert.equal(
    $('urlset').attr('xmlns'),
    'http://www.sitemaps.org/schemas/sitemap/0.9',
  );
  const actual = $('url > loc')
    .toArray()
    .map((el) => $(el).text());
  const expected = Object.keys(routes).flatMap((id) =>
    ['en', 'fr'].map((lang) => origin + pathFor(id, lang)),
  );
  assert.equal(actual.length, Object.keys(routes).length * 2);
  assert.ok(!actual.includes(origin + '/'), 'exclude the redirected root');
  assert.equal(new Set(actual).size, actual.length);
  assert.deepEqual([...actual].sort(), [...expected].sort());
  for (const loc of actual) {
    const url = new URL(loc);
    assert.equal(url.origin, origin);
    assert.equal(url.search + url.hash, '');
    assert.equal(html(url.pathname)('link[rel=canonical]').attr('href'), loc);
  }
  assert.equal(
    $('lastmod,priority,changefreq').length,
    0,
    'no invented freshness or priority',
  );
});

test('Owner-authorized production indexing and explicit staging overrides reject malformed verification tokens', () => {
  for (const value of ['', 'false', 'TRUE', '1']) {
    const config = searchConfiguration({ PUBLIC_SITE_INDEXABLE: value });
    assert.equal(config.indexable, false);
    assert.equal(config.robots, 'noindex, nofollow');
    assert.equal(robotsText(config.indexable), 'User-agent: *\nDisallow: /\n');
  }
  const enabled = searchConfiguration({
    PUBLIC_SITE_INDEXABLE: 'true',
    PUBLIC_GOOGLE_SITE_VERIFICATION: 'synthetic_Google-token_123',
    PUBLIC_BING_SITE_VERIFICATION: '1234567890ABCDEF',
  });
  assert.equal(enabled.robots, 'index, follow');
  assert.equal(enabled.google, 'synthetic_Google-token_123');
  assert.equal(enabled.bing, '1234567890ABCDEF');
  assert.match(
    robotsText(enabled.indexable),
    /Allow: \/\n\nSitemap: https:\/\/defibrillators.ca\/sitemap.xml/,
  );
  assert.throws(() =>
    searchConfiguration({
      PUBLIC_GOOGLE_SITE_VERIFICATION: '<meta content="unsafe">',
    }),
  );
  assert.throws(() =>
    searchConfiguration({ PUBLIC_BING_SITE_VERIFICATION: 'bad token' }),
  );
  assert.equal(searchConfiguration().indexable, true);
  assert.equal(
    fs.readFileSync('dist/robots.txt', 'utf8'),
    robotsText(searchConfig.indexable),
  );
  for (const route of ['/', '/en/', '/fr/']) {
    const $ = html(route);
    assert.equal($('meta[name=robots]').attr('content'), searchConfig.robots);
    assert.equal(
      $('meta[name="google-site-verification"],meta[name="msvalidate.01"]')
        .length,
      2,
    );
  }
});

test('JSON-LD serialization cannot terminate the script element', () => {
  const payload = { text: '</script><script>alert(1)</script>\u2028\u2029' };
  const encoded = safeJson(payload);
  assert.equal(encoded.includes('<'), false);
  assert.equal(encoded.includes('\u2028'), false);
  assert.deepEqual(JSON.parse(encoded), payload);
});

test('Structured data reflects visible content and never fabricates commercial or local claims', () => {
  for (const id of Object.keys(routes))
    for (const lang of ['en', 'fr']) {
      const route = pathFor(id, lang),
        $ = html(route),
        graph = graphOf($);
      const webpage = graph.find(
        (node) => node['@id'] === origin + route + '#webpage',
      );
      assert.equal(webpage.url, origin + route);
      assert.equal(webpage.inLanguage, lang + '-CA');
      assert.equal(webpage.name, $('title').text());
      assert.equal(
        webpage.description,
        $('meta[name=description]').attr('content'),
      );
      const org = graph.find((node) => node['@type'] === 'Organization');
      assert.equal(org.name, 'Defibrillators.ca');
      assert.equal(org.telephone, '+18336969996');
      assert.equal(org.email, 'info@defibrillators.ca');
      for (const node of walk(graph)) {
        assert.ok(
          ![
            'LocalBusiness',
            'Offer',
            'AggregateOffer',
            'AggregateRating',
            'Review',
          ].includes(node['@type']),
          route,
        );
        for (const key of [
          'offers',
          'aggregateRating',
          'review',
          'sku',
          'gtin',
          'hasCertification',
          'address',
          'geo',
          'openingHours',
        ])
          assert.equal(node[key], undefined, `${route}: unsupported ${key}`);
        if (node['@type'] === 'Question') {
          assert.ok(normalize($('main').text()).includes(normalize(node.name)));
          assert.ok(
            normalize($('main').text()).includes(
              normalize(node.acceptedAnswer.text),
            ),
          );
        }
      }
      const product = graph.find((node) => node['@type'] === 'Product');
      assert.equal(!!product, modelIds.includes(id));
      if (product) assert.equal(product.name, $('h1').text().trim());
      if (id !== 'home') {
        const breadcrumb = graph.find(
          (node) => node['@type'] === 'BreadcrumbList',
        ).itemListElement;
        const visible = $('.breadcrumbs li').toArray();
        assert.equal(breadcrumb.length, visible.length);
        breadcrumb.forEach((node, i) => {
          assert.equal(node.position, i + 1);
          assert.equal(node.name, normalize($(visible[i]).text()));
          assert.equal(
            node.item,
            i === visible.length - 1
              ? origin + route
              : origin + $(visible[i]).find('a').attr('href'),
          );
        });
      }
    }
});

test('Location guides cover 13 regions and 45 city/metro guides with distinct bilingual briefs and linked hierarchy', () => {
  assert.equal(locationGuides.length, 59);
  const regions = locationGuides.filter(
    (guide) => guide.parent === 'locations',
  );
  assert.equal(regions.length, 13);
  assert.deepEqual(regions.map((guide) => guide.code).sort(), [
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NS',
    'NT',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT',
  ]);
  assert.equal(
    locationGuides.filter(
      (guide) => guide.parent && guide.parent !== 'locations',
    ).length,
    45,
  );
  for (const lang of ['en', 'fr']) {
    const unique = new Set();
    for (const guide of locationGuides) {
      const route = pathFor(guide.id, lang),
        $ = html(route);
      assert.equal($('.location-brief li').length, 4);
      assert.equal($('.location-faqs details').length, 2);
      assert.match(
        $('.location-guide .notice').text(),
        lang === 'en'
          ? /do not represent local offices/
          : /ne représentent pas des bureaux locaux/,
      );
      for (const section of guide.sections) {
        assert.ok(
          !unique.has(section.body[lang]),
          'unique substantive sections',
        );
        unique.add(section.body[lang]);
        assert.ok(
          normalize($('main').text()).includes(normalize(section.body[lang])),
        );
      }
      if (guide.parent) {
        const parent = html(pathFor(guide.parent, lang));
        assert.ok(
          parent(`main a[href="${route}"]`).length,
          'parent directory links to child',
        );
        assert.ok(
          $(`.breadcrumbs a[href="${pathFor(guide.parent, lang)}"]`).length,
          'child links to parent',
        );
      }
      for (const link of $(
        '.page-hero .button,.enquiry-actions .button',
      ).toArray()) {
        const target = new URL($(link).attr('href'), origin);
        assert.equal(target.pathname, pathFor('quote', lang));
        assert.equal(target.searchParams.get('source'), guide.id);
      }
      const map = $('.location-map img').attr('src');
      assert.equal(map, `/maps/${guide.mapId ?? guide.id}.svg`);
      assert.ok(
        fs.statSync('public' + map).size < 80_000,
        'lightweight locator map',
      );
      assert.ok($('.map-credit a[href*="statcan.gc.ca"]').length);
      const schema = graphOf($).find(
        (n) => n['@id'] === origin + route + '#webpage',
      );
      assert.equal(schema.about.name, guide.place[lang]);
      if (guide.parent && guide.parent !== 'locations')
        assert.equal($('.breadcrumbs li').length, 4);
    }
  }
  assert.equal(provinceForLocation('montreal'), 'QC');
  assert.equal(provinceForLocation('toronto'), 'ON');
  assert.equal(provinceForLocation('vancouver'), 'BC');
  assert.equal(provinceForLocation('calgary'), 'AB');
  for (const source of ['locations', 'unknown', '__proto__', 'constructor'])
    assert.equal(provinceForLocation(source), undefined);
});

test('WHC header supports every emitted inline script within a conservative size budget', () => {
  const headers = fs.readFileSync('dist/.htaccess', 'utf8');
  const csp = headers
    .split('\n')
    .find((line) => line.includes('Content-Security-Policy'));
  assert.ok(
    Buffer.byteLength(csp) < 7500,
    'keep the CSP header under common 8 KB header limits',
  );
  assert.doesNotMatch(headers, /__SCRIPT_HASHES__/);
  assert.doesNotMatch(csp, /script-src[^;]*unsafe-inline/);
  for (const id of Object.keys(routes))
    for (const lang of ['en', 'fr']) {
      const routeHeaders = fs.readFileSync(
        path.join('dist', pathFor(id, lang), '.htaccess'),
        'utf8',
      );
      const pageCsp = routeHeaders
        .split('\n')
        .find((line) => line.includes('Content-Security-Policy'));
      assert.ok(Buffer.byteLength(pageCsp) < 7500);
      assert.doesNotMatch(pageCsp, /script-src[^;]*unsafe-inline/);
      const $ = html(pathFor(id, lang));
      $('script:not([src])').each((_, el) => {
        const text = $(el).text();
        if (text)
          assert.ok(
            pageCsp.includes(
              createHash('sha256').update(text).digest('base64'),
            ),
            `${id}/${lang} script hash`,
          );
      });
    }
});

test('Host redirect configuration preserves paths, query strings and certificate validation', () => {
  const config = fs.readFileSync('dist/.htaccess', 'utf8');
  const entryRule =
    'RewriteRule ^(?:index\\.html)?$ https://defibrillators.ca/en/ [R=301,L]';
  assert.ok(config.includes(entryRule));
  assert.ok(
    config.indexOf(entryRule) < config.indexOf('RewriteCond %{THE_REQUEST}'),
    'root and root index go straight to the canonical English homepage',
  );
  assert.ok(config.includes('^(?:www\\.)?defibrillator\\.ca$'));
  assert.ok(config.includes('^www\\.defibrillators\\.ca$'));
  assert.ok(
    config.includes('https://defibrillators.ca%{REQUEST_URI} [R=301,L]'),
  );
  assert.ok(config.includes('!^/\\.well-known/'));
  assert.ok(config.includes('RewriteCond %{THE_REQUEST}'));
  assert.ok(
    config.includes(
      'RewriteRule ^(.*/)?index\\.html$ https://defibrillators.ca/$1 [R=301,L]',
    ),
  );
  assert.doesNotMatch(config, /\bQSD\b/, 'preserve RFQ query identifiers');
});
