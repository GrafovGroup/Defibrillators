import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';
import { makeMeasurement } from '../src/lib/measurement.ts';
import { validateRfq } from '../src/lib/rfq.ts';

test('Measurement drops personal data, arbitrary URLs, invalid enums and unknown fields', () => {
  const clean = makeMeasurement('rfq_success', {
    page: 'quote',
    language: 'fr',
    source_page: 'cabinetMounting',
    city: 'ottawa',
    audience: 'commercial',
    request_type: 'installation',
    name: 'Private Person',
    email: 'private@example.com',
    phone: '1234567890',
    message: 'Private enquiry',
    address: '123 Main Street',
    request_id: 'unique-personal-id',
    url: 'https://example.com/?email=private',
    channel: 'private@example.com',
    placement: 'https://example.com',
    outcome: 'Error containing customer details',
  });
  assert.deepEqual(clean, {
    event: 'rfq_success',
    page: 'quote',
    language: 'fr',
    source_page: 'cabinetMounting',
    city: 'ottawa',
    audience: 'commercial',
    request_type: 'installation',
  });
  assert.equal(
    makeMeasurement('private@example.com', { page: 'home', language: 'en' }),
    null,
  );
  assert.equal(
    makeMeasurement('rfq_start', { page: 'constructor', language: 'en' }),
    null,
  );
  assert.equal(
    makeMeasurement('rfq_start', { page: 'home', language: 'private' }),
    null,
  );
  assert.deepEqual(
    makeMeasurement('contact_click', {
      page: 'toronto',
      language: 'en',
      city: '123 Main Street',
      source_page: '__proto__',
      channel: 'phone',
    }),
    {
      event: 'contact_click',
      page: 'toronto',
      language: 'en',
      channel: 'phone',
    },
  );
});

test('An enquiry validates with irrelevant optional controls absent', () => {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: 'Test Person',
    email: 'qa@example.com',
    province: 'QC',
    audience: 'residential',
    request_type: 'training',
    message: 'Synthetic training enquiry.',
    consent: 'yes',
  }))
    data.set(key, value);
  assert.deepEqual(validateRfq(data, 'en'), {});
  data.set('installation', 'unverified-service');
  data.set('maintenance', 'arbitrary');
  assert.deepEqual(Object.keys(validateRfq(data, 'en')).sort(), [
    'installation',
    'maintenance',
  ]);
});

for (const [lang, route] of [
  ['en', 'en/request-quote'],
  ['fr', 'fr/demander-soumission'],
]) {
  test(`${lang}: request comes first and optional details retain an accessible native fallback`, () => {
    const $ = load(fs.readFileSync(`dist/${route}/index.html`, 'utf8'));
    for (const form of $('form[data-rfq]').toArray()) {
      const f = $(form),
        optional = f.find('[data-optional-details]');
      assert.equal(
        f
          .find('input:not([type=hidden]):not([name=_gotcha]),select,textarea')
          .first()
          .attr('name'),
        'request_type',
      );
      assert.equal(optional.length, 1);
      assert.ok(
        optional.is('[open]'),
        'All optional fields remain reachable without enhancement',
      );
      assert.equal(
        optional.find('[required]').length,
        0,
        'Required controls cannot disappear inside the optional disclosure',
      );
      assert.equal(
        f.find('[name=message]').parents('[data-optional-details]').length,
        0,
      );
      assert.equal(optional.find('[name=model]').length, 1);
      assert.equal(
        f
          .find('[name=installation]')
          .closest('[data-request-field]')
          .attr('data-request-field'),
        'equipment installation programs',
      );
      if (f.find('[name=renewal_reference]').length)
        assert.equal(
          f
            .find('[name=renewal_reference]')
            .closest('[data-maintenance-renewal]').length,
          1,
        );
    }
    assert.equal($('body').attr('data-page'), 'quote');
    assert.equal($('body').attr('data-language'), lang);
  });
}

test('Measurement preparation has no network, persistent storage or third-party loader', () => {
  for (const file of ['src/lib/measurement.ts', 'src/scripts/measurement.ts']) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(
      source,
      /\b(fetch|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB)\b|document\.cookie|https?:\/\//,
    );
  }
});
