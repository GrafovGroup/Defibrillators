import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';
import vm from 'node:vm';
import {
  sourcePaths,
  pageIds,
  clientCities,
  clientProvinces,
  partIds,
} from '../src/data/client-enquiry.ts';
import { routes, pathFor } from '../src/data/routes.ts';
import { cityCatalogue, cityIds } from '../src/data/city-catalogue.ts';
import { provinceForLocation } from '../src/data/location-routes.ts';
import { partOptions } from '../src/data/planning-options.ts';

test('Compact client catalogue exactly matches editorial source routes and city prefills', () => {
  assert.deepEqual(pageIds, Object.keys(routes));
  for (const id of pageIds)
    for (const lang of ['en', 'fr'])
      assert.equal(sourcePaths[id][lang], pathFor(id, lang));
  for (const id of cityIds)
    assert.deepEqual(clientCities[id], {
      en: cityCatalogue[id].en,
      fr: cityCatalogue[id].fr,
    });
  for (const id of pageIds)
    assert.equal(clientProvinces[id], provinceForLocation(id));
  assert.deepEqual(
    partIds,
    partOptions.map((p) => p.id),
  );
});

const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(`${dir}/${entry.name}`)
        : [`${dir}/${entry.name}`],
    );
test('Every built page is free of analytics controls and Google tracking resources', () => {
  for (const file of walk('dist').filter((name) => /\.(html|js)$/.test(name))) {
    const content = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(
      content,
      /googletagmanager\.com|google-analytics\.com|G-ERD2WFW0WZ|data-analytics-(consent|preferences|allow|deny)/,
      file,
    );
  }
  for (const file of walk('dist').filter((name) =>
    name.endsWith('.htaccess'),
  )) {
    assert.doesNotMatch(
      fs.readFileSync(file, 'utf8'),
      /googletagmanager|google-analytics/,
      file,
    );
  }
  for (const lang of ['en', 'fr']) {
    const $ = load(
      fs.readFileSync(`dist${pathFor('quote', lang)}index.html`, 'utf8'),
    );
    assert.equal($('form[action="https://formspree.io/f/maeezonn"]').length, 2);
    assert.equal($('meta[name="robots"]').attr('content'), 'index, follow');
  }
});
test('Returning visitors lose only retired analytics state, including when storage is blocked', () => {
  const source = fs.readFileSync('src/scripts/retire-analytics.ts', 'utf8');
  for (const blocked of [false, true]) {
    const removed = [];
    const cookies = [];
    const document = {};
    Object.defineProperty(document, 'cookie', {
      get: () =>
        'session=keep; dfca_ga=old; dfca_ga_ERD2WFW0WZ=old; other_preference=keep; dfca_garden=keep',
      set: (value) => cookies.push(value),
    });
    vm.runInNewContext(source, {
      document,
      location: { hostname: 'defibrillators.ca' },
      localStorage: {
        removeItem: (key) => {
          if (blocked) throw new Error('Storage denied');
          removed.push(key);
        },
      },
    });
    assert.deepEqual(removed, blocked ? [] : ['dfca-analytics-v1']);
    assert.equal(cookies.length, 6);
    for (const cookie of cookies) {
      assert.match(cookie, /^dfca_ga(?:_ERD2WFW0WZ)?=; Max-Age=0; Path=\//);
      assert.doesNotMatch(cookie, /session|other_preference|dfca_garden/);
    }
  }
});
