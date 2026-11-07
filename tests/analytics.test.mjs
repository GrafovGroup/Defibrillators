import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';
import { consentLifetime } from '../src/data/analytics.ts';
import { readAnalyticsChoice, analyticsEvent } from '../src/lib/analytics.ts';
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

test('Analytics choices expire, reject malformed/future values and preserve refusal', () => {
  const now = 2 * consentLifetime;
  for (const raw of [
    null,
    '{}',
    'bad',
    'true',
    JSON.stringify({ allowed: 'true', at: now }),
    JSON.stringify({ allowed: true, at: now + 1 }),
    JSON.stringify({ allowed: true, at: now - consentLifetime }),
  ])
    assert.equal(readAnalyticsChoice(raw, now), null);
  for (const allowed of [true, false])
    assert.equal(
      readAnalyticsChoice(JSON.stringify({ allowed, at: now - 1 }), now),
      allowed,
    );
});
test('GA4 mapping counts only confirmed enquiries as leads and drops personal data', () => {
  assert.equal(analyticsEvent(null), null);
  assert.equal(
    analyticsEvent({ event: 'purchase', page: 'quote', language: 'en' }),
    null,
  );
  const event = analyticsEvent({
    event: 'rfq_success',
    page: 'quote',
    language: 'fr',
    source_page: 'adultPads',
    city: 'montreal',
    audience: 'residential',
    request_type: 'accessories',
    email: 'private@example.com',
    message: 'private',
    request_id: 'private-id',
    url: 'https://example.com/?email=private',
  });
  assert.deepEqual(event, {
    name: 'generate_lead',
    params: {
      page_id: 'quote',
      site_language: 'fr',
      source_page: 'adultPads',
      planning_city: 'montreal',
      enquiry_audience: 'residential',
      request_type: 'accessories',
    },
  });
  for (const name of [
    'rfq_start',
    'rfq_error',
    'rfq_provider_handoff',
    'contact_click',
  ])
    assert.equal(
      analyticsEvent({ event: name, page: 'quote', language: 'en' }).name,
      name,
    );
});
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
test('Bilingual optional analytics is initially hidden and has equal accept/decline controls', () => {
  for (const [lang, route] of [
    ['en', 'en'],
    ['fr', 'fr'],
  ]) {
    const $ = load(fs.readFileSync(`dist/${route}/index.html`, 'utf8'));
    const panel = $('[data-analytics-consent]');
    assert.equal(panel.length, 1);
    assert.equal(panel.is('[hidden]'), true);
    assert.equal(panel.attr('data-measurement-id'), 'G-ERD2WFW0WZ');
    assert.equal(panel.find('[data-analytics-allow]').length, 1);
    assert.equal(panel.find('[data-analytics-deny]').length, 1);
    assert.equal($('[data-analytics-preferences]').length, 1);
    assert.equal($('script[src*="googletagmanager"]').length, 0);
    assert.ok(
      panel
        .find('a')
        .attr('href')
        .startsWith('/' + lang + '/'),
    );
  }
});
