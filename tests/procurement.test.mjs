import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from 'cheerio';
import { validateRfq, submitRfq, messages } from '../src/lib/rfq.ts';
import { enquiryPath } from '../src/lib/enquiry.ts';
import { safeEnquiryParams } from '../src/lib/enquiry-context.ts';
import { pathFor } from '../src/data/routes.ts';
import { makeMeasurement } from '../src/lib/measurement.ts';

const brief = () => {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    name: 'Test Buyer',
    company: 'Test Municipality',
    email: 'buyer@example.com',
    audience: 'commercial',
    province: 'MB',
    locations: 'Test receiving site',
    message: 'Please review this synthetic procurement brief.',
    request_type: 'procurement',
  }))
    data.set(key, value);
  return data;
};
const files = () => [
  new File(['test'], 'specification.pdf', { type: 'application/pdf' }),
  new File(['test'], 'schedule.xlsx', {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }),
  new File(['test'], 'label.jpg', { type: 'image/jpeg' }),
];
for (const lang of ['en', 'fr']) {
  const html = (id) =>
    load(fs.readFileSync(`dist${pathFor(id, lang)}index.html`, 'utf8'));
  test(`${lang}: procurement and compatibility pages are discoverable with paired, factual metadata`, () => {
    const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
    for (const id of ['procurement', 'mountCompatibility']) {
      const $ = html(id);
      assert.ok(sitemap.includes(pathFor(id, lang)));
      assert.ok(html('search')(`a[href="${pathFor(id, lang)}"]`).length);
      assert.ok(html('resources')(`a[href="${pathFor(id, lang)}"]`).length);
      assert.ok(
        html('municipalities')(`a[href="${pathFor(id, lang)}"]`).length,
      );
      assert.equal($('h1').length, 1);
      assert.ok($('article section').length >= 5);
      assert.equal(
        $('link[hreflang="' + (lang === 'en' ? 'fr' : 'en') + '-CA"]').attr(
          'href',
        ),
        'https://defibrillators.ca' + pathFor(id, lang === 'en' ? 'fr' : 'en'),
      );
      const url = new URL(
        $('.page-hero .button').attr('href'),
        'https://defibrillators.ca',
      );
      assert.equal(url.searchParams.get('request'), 'procurement');
      assert.equal(url.searchParams.get('source'), id);
      const graph = JSON.parse($('script[type="application/ld+json"]').text())[
        '@graph'
      ];
      assert.ok(
        !graph.some((node) =>
          ['Offer', 'Product', 'LocalBusiness'].includes(node['@type']),
        ),
      );
      assert.doesNotMatch(
        $('main').text(),
        /830-2026|235 McPhillips|100-10-X2|20 inches|10 mount arms/,
      );
    }
    const guide = html('mountCompatibility');
    assert.ok(guide('#guide-sources a[href*="technimount.com"]').length >= 2);
    assert.match(guide('article').text(), /570-10-PRO2-LFS/);
    assert.equal(guide('#guide-questions details').length, 4);
    const graph = JSON.parse(
      guide('script[type="application/ld+json"]').text(),
    )['@graph'];
    assert.equal(
      graph.find((node) => node['@type'] === 'Article').citation.length,
      3,
    );
    assert.equal(
      graph.find((node) => node['@type'] === 'FAQPage').mainEntity.length,
      4,
    );
    assert.match(
      html('procurement')('.business-details').text(),
      /Superclean Canada Inc\./,
    );
  });
  test(`${lang}: procurement controls are optional, commercial-only and support native multipart uploads`, () => {
    const $ = html('quote');
    assert.equal($('#commercial-form [value=procurement]').length, 1);
    assert.equal($('#residential-form [value=procurement]').length, 0);
    const group = $('#commercial-form [data-request-details=procurement]');
    assert.equal(group.length, 1);
    assert.equal(group.find('[required],[disabled]').length, 0);
    assert.equal(group.find('input,select,textarea').length, 9);
    assert.ok($('#commercial-form [name=attachment]').is('[multiple]'));
    assert.match(
      $('#commercial-form [name=attachment]').attr('accept'),
      /\.xlsx/,
    );
    assert.equal($('[name=consent]').length, 0);
  });
  test(`${lang}: complete and incomplete procurement deadlines validate without assuming a time zone`, () => {
    const data = brief();
    assert.deepEqual(validateRfq(data, lang), {});
    data.set('deadline_date', '2026-12-01');
    assert.deepEqual(Object.keys(validateRfq(data, lang)).sort(), [
      'deadline_time',
      'deadline_zone',
    ]);
    data.set('deadline_time', '16:00');
    data.set('deadline_zone', 'Winnipeg local time');
    data.set('delivery_date', '2027-01-15');
    data.set('procurement_url', 'https://example.com/tender');
    data.set('alternatives', 'approval-required');
    data.set('technical_training', 'both');
    assert.deepEqual(validateRfq(data, lang), {});
    data.set('deadline_date', '2027-02-29');
    data.set('deadline_time', '25:30');
    data.set('delivery_date', 'not-a-date');
    assert.deepEqual(Object.keys(validateRfq(data, lang)).sort(), [
      'deadline_date',
      'deadline_time',
      'delivery_date',
    ]);
  });
  test(`${lang}: attachment validation checks every file, count, extension, MIME and size`, () => {
    const data = brief();
    for (const file of files()) data.append('attachment', file);
    assert.deepEqual(validateRfq(data, lang), {});
    data.append('attachment', files()[0]);
    assert.equal(validateRfq(data, lang).attachment, messages[lang].attachment);
    for (const bad of [
      new File(['x'], 'macro.xlsm', {
        type: 'application/vnd.ms-excel.sheet.macroEnabled.12',
      }),
      new File(['x'], 'script.exe', { type: 'application/pdf' }),
      new File(['x'], 'image.png', { type: 'text/javascript' }),
      new File([new Uint8Array(2097153)], 'large.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
    ]) {
      data.delete('attachment');
      data.append('attachment', files()[0]);
      data.append('attachment', bad);
      assert.ok(validateRfq(data, lang).attachment);
    }
    data.set('attachment', new File(['x'], 'schedule.XLSX', { type: '' }));
    assert.deepEqual(validateRfq(data, lang), {});
    data.set(
      'attachment',
      new File([], '', { type: 'application/octet-stream' }),
    );
    assert.deepEqual(validateRfq(data, lang), {});
  });
}
test('Procurement fields reject unsafe links, overlong input and unsupported options', () => {
  const data = brief();
  for (const link of [
    'javascript:alert(1)',
    'https://user:password@example.com/file',
    'http://example.com',
    'not a url',
  ]) {
    data.set('procurement_url', link);
    assert.ok(validateRfq(data, 'en').procurement_url);
  }
  data.delete('procurement_url');
  data.set('equipment_details', 'x'.repeat(1501));
  data.set('alternatives', 'approved-by-us');
  data.set('technical_training', 'certified');
  assert.deepEqual(Object.keys(validateRfq(data, 'en')).sort(), [
    'alternatives',
    'equipment_details',
    'technical_training',
  ]);
});
test('Multipart submission preserves all attachments and procurement details', async () => {
  const data = brief();
  for (const file of files()) data.append('attachment', file);
  data.set('procurement_reference', 'SYNTHETIC-123');
  const result = await submitRfq(data, 'en', async (url, options) => {
    assert.equal(url, 'https://formspree.io/f/maeezonn');
    assert.equal(options.body.getAll('attachment').length, 3);
    assert.equal(options.body.get('procurement_reference'), 'SYNTHETIC-123');
    return Response.json({ ok: true });
  });
  assert.equal(result.kind, 'success');
});
test('Provider attachment errors remain localized and link to the upload control', async () => {
  for (const field of ['attachment', 'attachment[]', 'attachment[1]']) {
    const result = await submitRfq(brief(), 'fr', async () =>
      Response.json(
        { errors: [{ field, code: 'TYPE_FILE' }] },
        { status: 422 },
      ),
    );
    assert.deepEqual(result.fields, { attachment: messages.fr.attachment });
    assert.equal(result.kind, 'error');
  }
});
test('Procurement context keeps private tender data out of links and measurement', () => {
  for (const id of ['procurement', 'mountCompatibility']) {
    const url = new URL(enquiryPath(id, 'fr'), 'https://defibrillators.ca');
    url.searchParams.set('procurement_reference', 'private');
    url.searchParams.set('deadline_date', '2026-12-01');
    url.searchParams.set('equipment_details', 'private');
    assert.deepEqual([...safeEnquiryParams(url.searchParams).keys()].sort(), [
      'audience',
      'request',
      'source',
    ]);
  }
  assert.deepEqual(
    makeMeasurement('rfq_start', {
      page: 'quote',
      language: 'en',
      request_type: 'procurement',
      procurement_reference: 'private',
      procurement_url: 'https://example.com/private',
      deadline_date: '2026-12-01',
    }),
    {
      event: 'rfq_start',
      page: 'quote',
      language: 'en',
      request_type: 'procurement',
    },
  );
});
