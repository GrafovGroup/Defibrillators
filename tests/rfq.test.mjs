import test from 'node:test';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';
import {
  validateRfq,
  submitRfq,
  consentVersion,
  consentText,
  requestTypes,
  formEndpoint,
  messages,
} from '../src/lib/rfq.ts';
import { products } from '../src/data/products.ts';
import { renewalDue } from '../src/lib/maintenance.ts';
const valid = (audience = 'commercial') => {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: 'Integration Test',
    company: 'Example organisation',
    email: 'qa@example.com',
    province: 'ON',
    locations: 'Example City',
    audience,
    request_type: 'equipment',
    model: 'zoll',
    installation: 'discuss',
    maintenance: 'recurring',
    message: 'Synthetic integration test only.',
    consent: 'yes',
    consent_version: consentVersion,
    consent_text: consentText.en,
    locale: 'en',
  }))
    data.set(key, value);
  return data;
};
for (const lang of ['en', 'fr']) {
  const route = lang === 'en' ? 'en/request-quote' : 'fr/demander-soumission';
  test(`${lang}: functional native POST forms, consent and accessible controls`, () => {
    const $ = load(fs.readFileSync(`dist/${route}/index.html`, 'utf8'));
    assert.equal($('form').length, 2);
    for (const form of $('form').toArray()) {
      const f = $(form);
      assert.equal(f.attr('action'), formEndpoint);
      assert.equal(f.attr('method'), 'POST');
      assert.equal(f.attr('enctype'), 'multipart/form-data');
      assert.equal(f.find('[name=consent][required]').length, 1);
      assert.equal(f.find('[name=consent]').attr('checked'), undefined);
      assert.equal(f.find('[name=consent_version]').val(), consentVersion);
      assert.equal(f.find('[name=consent_text]').val(), consentText[lang]);
      assert.equal(f.find('[name=_language]').val(), lang);
      assert.equal(f.find('[name=_gotcha][tabindex="-1"]').length, 1);
      f.find('input:not([type=hidden]),select,textarea').each((_, el) =>
        assert.equal($(`label[for="${$(el).attr('id')}"]`).length, 1),
      );
      f.find('[data-error]').each((_, error) => {
        const input = f.find(`[name="${$(error).attr('data-error')}"]`);
        assert.ok(
          (input.attr('aria-describedby') ?? '')
            .split(' ')
            .includes($(error).attr('id')),
          `${input.attr('name')} error must be linked to its control`,
        );
      });
      assert.equal(
        f.find('[name=province] option[value=BC]').text(),
        lang === 'fr' ? 'Colombie-Britannique (BC)' : 'British Columbia (BC)',
      );
      assert.equal(f.find('[data-errors][role=alert]').length, 1);
    }
    assert.equal($('#residential-form [name=company]').length, 0);
    assert.equal($('#commercial-form [name=company][required]').length, 1);
  });
  test(`${lang}: validation enforces required fields and consent`, () => {
    assert.deepEqual(validateRfq(valid(), lang), {});
    const data = valid();
    data.delete('consent');
    data.set('email', 'bad');
    data.set('message', 'tiny');
    data.set('quantity', '2.5');
    data.set('province', 'XX');
    data.set('company', ' ');
    const errors = validateRfq(data, lang);
    for (const field of [
      'consent',
      'email',
      'message',
      'quantity',
      'province',
      'company',
    ])
      assert.ok(errors[field]);
  });
}
test('Residential enquiry does not require company or site details', () => {
  const data = valid('residential');
  data.delete('company');
  data.delete('locations');
  assert.deepEqual(validateRfq(data, 'en'), {});
});
test('Validation explains length limits and preserves required-field errors', () => {
  for (const lang of ['en', 'fr']) {
    const data = valid();
    data.set('name', 'A');
    data.set('province', '');
    const errors = validateRfq(data, lang);
    assert.match(errors.name, /2.*100/);
    assert.equal(errors.province, messages[lang].required);
  }
});
test('Every request category and maintenance lifecycle value is accepted', () => {
  for (const type of requestTypes) {
    const data = valid();
    data.set('request_type', type);
    assert.deepEqual(validateRfq(data, 'en'), {});
  }
  for (const type of ['recurring', 'renewal', 'one-time', 'none', 'discuss']) {
    const data = valid();
    data.set('maintenance', type);
    assert.deepEqual(validateRfq(data, 'fr'), {});
  }
});
test('Attachment size and type restrictions', () => {
  const data = valid();
  data.set(
    'attachment',
    new File(['test'], 'brief.pdf', { type: 'application/pdf' }),
  );
  assert.deepEqual(validateRfq(data, 'en'), {});
  data.set(
    'attachment',
    new File(['test'], 'script.exe', { type: 'application/pdf' }),
  );
  assert.ok(validateRfq(data, 'en').attachment);
  data.set(
    'attachment',
    new File([new Uint8Array(2097153)], 'large.pdf', {
      type: 'application/pdf',
    }),
  );
  assert.ok(validateRfq(data, 'fr').attachment);
});
test('Accepted submission sends multipart data to the supplied endpoint', async () => {
  const data = valid();
  const result = await submitRfq(data, 'en', async (url, options) => {
    assert.equal(url, formEndpoint);
    assert.equal(options.method, 'POST');
    assert.equal(options.body, data);
    assert.equal(options.headers.Accept, 'application/json');
    assert.ok(options.signal);
    return Response.json({ ok: true });
  });
  assert.deepEqual(result, { kind: 'success' });
});
test('Provider failures, ambiguous responses and network errors never become success', async () => {
  for (const response of [
    Response.json({ ok: false }),
    Response.json({ next: 'https://example.com' }),
    new Response('<html>Error</html>', { status: 500 }),
    Response.json({ ok: true }, { status: 429 }),
  ]) {
    assert.equal(
      (await submitRfq(valid(), 'fr', async () => response)).kind,
      'error',
    );
  }
  const result = await submitRfq(valid(), 'en', async () => {
    throw new Error('offline');
  });
  assert.equal(result.kind, 'error');
});
test('Server field errors are translated without displaying provider content', async () => {
  const result = await submitRfq(valid(), 'fr', async () =>
    Response.json(
      {
        errors: [
          {
            field: 'email',
            code: 'TYPE_EMAIL',
            message: '<script>unsafe</script>',
          },
        ],
      },
      { status: 422 },
    ),
  );
  assert.equal(result.kind, 'error');
  assert.match(result.fields.email, /courriel/);
  assert.doesNotMatch(JSON.stringify(result), /script/);
});
test('CAPTCHA failures preserve a hosted verification path', async () => {
  const result = await submitRfq(valid(), 'en', async () =>
    Response.json({ errors: [{ code: 'RECAPTCHA_FAILED' }] }, { status: 400 }),
  );
  assert.equal(result.verification, true);
  assert.equal(result.kind, 'error');
});
test('Product data records provenance and explicit unknown commercial facts', () => {
  for (const product of products) {
    assert.ok(product.description.en && product.description.fr);
    assert.equal(product.quoteOnly, true);
    assert.equal(product.canadianLicence.licenceNumber, null);
    assert.equal(product.includedComponents, null);
    assert.equal(product.price, null);
    assert.equal(product.warranty, null);
    if (product.image) {
      assert.ok(product.imageProvenance.sourceUrl.startsWith('https://'));
      assert.equal(product.imageProvenance.exactSuppliedConfiguration, false);
    } else
      assert.equal(
        product.imageProvenance,
        null,
        'No invented photo provenance',
      );
    assert.ok(
      product.specifications.every((s) => s.sourceUrl === product.source.url),
    );
    assert.deepEqual(product.environments, ['unverified']);
  }
});
test('Renewals require an accepted active agreement and a real calendar date', () => {
  const base = {
    status: 'active',
    acceptedAt: '2026-11-01T12:00:00Z',
    renewalDate: '2027-11-01',
  };
  assert.equal(renewalDue(base, '2027-11-01'), true);
  assert.equal(renewalDue(base, '2027-10-31'), false);
  assert.equal(renewalDue({ ...base, status: 'enquiry' }, '2028-01-01'), false);
  assert.equal(renewalDue({ ...base, acceptedAt: null }, '2028-01-01'), false);
  assert.equal(
    renewalDue({ ...base, renewalDate: '2027-02-31' }, '2028-01-01'),
    false,
  );
});
test('WHC headers allow Formspree and every generated inline script by hash', () => {
  const headers = fs.readFileSync('dist/.htaccess', 'utf8');
  assert.match(headers, /form-action 'self' https:\/\/formspree.io/);
  assert.match(headers, /ErrorDocument 404 \/404.html/);
  assert.doesNotMatch(headers, /__SCRIPT_HASHES__/);
  const $ = load(fs.readFileSync('dist/en/request-quote/index.html', 'utf8'));
  const pageHeaders = fs.readFileSync(
    'dist/en/request-quote/.htaccess',
    'utf8',
  );
  $('script:not([src])').each((_, el) => {
    assert.ok(
      pageHeaders.includes(
        `'sha256-${createHash('sha256').update($(el).text()).digest('base64')}'`,
      ),
    );
  });
});
