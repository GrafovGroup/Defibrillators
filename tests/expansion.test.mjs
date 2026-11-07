import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
import { cityCatalogue, cityIds } from '../src/data/city-catalogue.ts';
import { locationPages } from '../src/data/locations.ts';
import { offeringIds, offeringRequests } from '../src/data/offering-routes.ts';
import { pages } from '../src/data/pages.ts';
import { pathFor } from '../src/data/routes.ts';
import { enquiryPath } from '../src/lib/enquiry.ts';
import { safeEnquiryParams } from '../src/lib/enquiry-context.ts';
import { matchesLocation } from '../src/lib/location-search.ts';
import { provinceForLocation } from '../src/data/location-routes.ts';
import { searchLaunch } from '../src/data/search-launch.ts';
const html = (id, lang) =>
  load(
    fs.readFileSync(path.join('dist', pathFor(id, lang), 'index.html'), 'utf8'),
  );

test('City coverage matches all 41 official CMA codes and the remaining capitals', () => {
  // Independently transcribed from Statistics Canada SGC 2021, CPV=A.
  const codes =
    '001 205 305 310 320 408 421 433 442 447 462 505 521 522 529 532 535 537 539 541 543 550 555 559 568 580 595 602 705 725 810 825 830 835 915 925 930 932 933 935 938'.split(
      ' ',
    );
  assert.deepEqual(
    cityIds
      .map((id) => cityCatalogue[id].cma)
      .filter(Boolean)
      .sort(),
    codes.sort(),
  );
  assert.deepEqual(cityIds.filter((id) => !cityCatalogue[id].cma).sort(), [
    'charlottetown',
    'iqaluit',
    'whitehorse',
    'yellowknife',
  ]);
  assert.equal(cityIds.length, 45);
  for (const id of cityIds) {
    const page = locationPages.find((page) => page.id === id);
    assert.ok(page, id);
    assert.equal(page.location.place.en, cityCatalogue[id].en);
    for (const lang of ['en', 'fr']) {
      const $ = html(id, lang);
      assert.equal($('.offering-columns li').length, 12);
      assert.ok($('time[datetime="2026-11-07"]').length);
      for (const link of $('.offering-columns a').toArray()) {
        assert.equal(
          new URL(
            $(link).attr('href'),
            'https://defibrillators.ca',
          ).searchParams.get('city'),
          id,
        );
      }
      assert.ok(
        page.sections[lang].reduce(
          (n, s) => n + s.body.split(/\s+/).length,
          0,
        ) >= 70,
        `${id}/${lang}: substantive local brief`,
      );
    }
  }
  assert.equal(
    provinceForLocation('ottawa'),
    undefined,
    'cross-province guide must not choose Ontario for a Gatineau project',
  );
  assert.equal(provinceForLocation('iqaluit'), 'NU');
});

test('City finder is crawlable without JavaScript and resolves accents, suburbs and province filters', () => {
  for (const lang of ['en', 'fr']) {
    const $ = html('locations', lang);
    assert.equal($('.city-directory a').length, 45);
    assert.equal($('.city-directory [hidden]').length, 0);
    assert.ok(
      $('[data-finder-controls]').is('[hidden]'),
      'no dead search control before enhancement',
    );
    for (const id of cityIds)
      assert.ok($(`.city-directory a[href="${pathFor(id, lang)}"]`).length);
  }
  assert.equal(matchesLocation('Québec City Lévis', 'QC', 'quebec'), true);
  assert.equal(
    matchesLocation('Vancouver Surrey Burnaby', 'BC', 'surrey', 'BC'),
    true,
  );
  assert.equal(
    matchesLocation('Ottawa–Gatineau', 'ON-QC', 'gatineau', 'QC'),
    true,
  );
  assert.equal(
    matchesLocation('Ottawa–Gatineau', 'ON-QC', 'ottawa', 'ON'),
    true,
  );
  assert.equal(
    matchesLocation('Saint John Rothesay', 'NB', 'saint john', 'NL'),
    false,
  );
  assert.equal(
    matchesLocation('St. John’s Mount Pearl', 'NL', 'st johns'),
    true,
  );
  assert.equal(
    matchesLocation('St. John’s Saint Johns Mount Pearl', 'NL', 'st johns'),
    true,
  );
  assert.equal(matchesLocation('Toronto', 'ON', 'nonexistent'), false);
});

test('Focused product/service pages retain semantic enquiry routing and bilingual source-backed answers', () => {
  assert.equal(offeringIds.length, 12);
  for (const id of offeringIds) {
    const page = pages.find((page) => page.id === id);
    for (const lang of ['en', 'fr']) {
      const $ = html(id, lang);
      assert.ok($('.guide-answer p').text().length > 80);
      assert.equal($('#guide-questions details').length, 1);
      assert.ok($('#guide-sources a').length >= 2);
      assert.equal($('#enquiry-city option').length, 46);
      const url = new URL(enquiryPath(id, lang), 'https://defibrillators.ca');
      assert.equal(url.searchParams.get('source'), id);
      assert.equal(
        url.searchParams.get('request'),
        offeringRequests[id].request,
      );
      if (offeringRequests[id].part)
        assert.equal(url.searchParams.get('part'), offeringRequests[id].part);
      const parent = html(page.parent, lang);
      assert.ok(
        parent(`main a[href="${pathFor(id, lang)}"]`).length,
        'reachable from parent',
      );
      const graph = JSON.parse($('script[type="application/ld+json"]').text())[
        '@graph'
      ];
      assert.equal(
        graph.find((n) => n['@type'] === 'Article').description,
        page.guide.summary[lang],
      );
    }
  }
});

test('Public city/offer context rejects arbitrary text, prototype names and personal information', () => {
  const safe = safeEnquiryParams(
    new URLSearchParams(
      'city=ottawa&source=cabinetMounting&request=installation&email=private@example.com&address=123%20Test',
    ),
  );
  assert.equal(safe.get('city'), 'ottawa');
  assert.equal(safe.get('source'), 'cabinetMounting');
  assert.equal(safe.has('email'), false);
  assert.equal(safe.has('address'), false);
  for (const value of [
    '__proto__',
    'constructor',
    'Toronto<script>',
    '123 Main St',
  ])
    assert.equal(
      safeEnquiryParams(new URLSearchParams({ city: value })).has('city'),
      false,
    );
});

test('Production verification tags match the account-provided public ownership tokens', () => {
  for (const lang of ['en', 'fr']) {
    const $ = html('home', lang);
    assert.equal(
      $('meta[name="google-site-verification"]').attr('content'),
      searchLaunch.google,
    );
    assert.equal(
      $('meta[name="msvalidate.01"]').attr('content'),
      searchLaunch.bing,
    );
    assert.equal($('meta[name="robots"]').attr('content'), 'index, follow');
  }
  assert.match(
    fs.readFileSync('dist/robots.txt', 'utf8'),
    /Allow: \/\n\nSitemap: https:\/\/defibrillators.ca\/sitemap.xml/,
  );
});
