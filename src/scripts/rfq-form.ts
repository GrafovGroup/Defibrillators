import {
  clientCities,
  clientProvinces,
  sourcePaths,
} from '../data/client-enquiry';
import {
  validateRfq,
  submitRfq,
  messages,
  type FieldErrors,
  type RfqLocale,
} from '../lib/rfq';
import { safeEnquiryParams } from '../lib/enquiry-context';

import { emitMeasurement, type MeasurementName } from '../lib/measurement';
const params = new URLSearchParams(location.search);
const audience =
  params.get('audience') === 'residential' ? 'residential' : 'commercial';
const safe = safeEnquiryParams(params);
if (safe.size)
  for (const link of document.querySelectorAll<HTMLAnchorElement>(
    '.locale-switch a',
  ))
    link.search = safe.toString();
for (const form of document.querySelectorAll<HTMLFormElement>('[data-rfq]')) {
  const lang = form.dataset.lang as RfqLocale;
  const m = messages[lang];
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const errors = form.querySelector<HTMLElement>('[data-errors]')!;
  const button = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const native = form.querySelector<HTMLButtonElement>('[data-native]')!;
  let busy = false;
  let started = false;
  let requestId = crypto.randomUUID();
  const controls = () =>
    Array.from(
      form.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >('input, select, textarea'),
    );
  const field = (name: string) =>
    controls().find((control) => control.name === name);
  const measure = (name: MeasurementName, outcome?: string) =>
    emitMeasurement(name, {
      page: 'quote',
      language: lang,
      source_page: safe.get('source') ?? 'quote',
      city: safe.get('city') ?? safe.get('source'),
      audience: field('audience')?.value,
      request_type: field('request_type')?.value,
      outcome,
    });
  const start = () => {
    if (started) return;
    started = true;
    measure('rfq_start');
  };
  form.addEventListener('input', start);
  form.addEventListener('change', start);
  const reveal = (input: Element) => {
    for (
      let parent = input.parentElement;
      parent;
      parent = parent.parentElement
    )
      if (parent instanceof HTMLDetailsElement) parent.open = true;
  };
  form.addEventListener(
    'invalid',
    (event) => {
      if (event.target instanceof Element) reveal(event.target);
    },
    true,
  );
  const showErrors = (fields: FieldErrors, message: string) => {
    errors.replaceChildren();
    errors.hidden = false;
    const heading = document.createElement('p');
    heading.textContent = message;
    errors.append(heading);
    const list = document.createElement('ul');
    for (const [name, message] of Object.entries(fields)) {
      const input = field(name);
      if (!input || input.type === 'hidden') continue;
      reveal(input);
      input.setAttribute('aria-invalid', 'true');
      const inline = form.querySelector<HTMLElement>(`[data-error="${name}"]`);
      if (inline) inline.textContent = message;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${input.id}`;
      link.textContent = `${input.labels?.[0]?.textContent?.trim() ?? name}: ${message}`;
      link.addEventListener('click', () => input.focus());
      item.append(link);
      list.append(item);
    }
    errors.append(list);
    errors.focus();
  };
  const clear = () => {
    errors.hidden = true;
    status.hidden = true;
    native.hidden = true;
    for (const el of form.querySelectorAll<HTMLElement>('[data-error]'))
      el.textContent = '';
    for (const input of controls()) input.removeAttribute('aria-invalid');
  };
  const details = form.closest('details')!;
  details.open = details.dataset.audience === audience;
  const optional = form.querySelector<HTMLDetailsElement>(
    '[data-optional-details]',
  )!;
  optional.open =
    safe.get('request') === 'procurement' ||
    ['model', 'part', 'package'].some((key) => safe.has(key));
  const syncDetails = () => {
    for (const group of form.querySelectorAll<HTMLElement>(
      '[data-request-details], [data-request-field], [data-maintenance-renewal]',
    )) {
      const relevant = group.hasAttribute('data-maintenance-renewal')
        ? field('maintenance')!.value === 'renewal' &&
          !field('maintenance')!.disabled
        : (group.dataset.requestDetails ?? group.dataset.requestField)!
            .split(' ')
            .includes(field('request_type')!.value);
      group.hidden = !relevant;
      if (group instanceof HTMLFieldSetElement) group.disabled = !relevant;
      for (const control of group.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >('input, select, textarea'))
        control.disabled = !relevant;
    }
    field('_subject')!.value =
      `Defibrillators.ca | ${field('audience')!.value} | ${field('request_type')!.value} | ${lang}`;
    if (field('request_type')!.value === 'procurement') optional.open = true;
  };
  field('request_type')!.addEventListener('change', syncDetails);
  field('maintenance')!.addEventListener('change', syncDetails);
  const cityId = safe.get('city') ?? safe.get('source') ?? '';
  const city = Object.hasOwn(clientCities, cityId)
    ? clientCities[cityId as keyof typeof clientCities]
    : undefined;
  const province = Object.hasOwn(clientProvinces, cityId)
    ? clientProvinces[cityId as keyof typeof clientProvinces]
    : undefined;
  const applyContext = () => {
    if (safe.has('model')) field('model')!.value = safe.get('model')!;
    if (
      safe.has('request') &&
      (field('audience')!.value === 'commercial' ||
        safe.get('request') !== 'procurement')
    )
      field('request_type')!.value = safe.get('request')!;
    if (safe.has('part')) field('accessory_type')!.value = safe.get('part')!;
    if (safe.has('package')) field('package')!.value = safe.get('package')!;
    if (safe.has('source'))
      field('source_page')!.value =
        sourcePaths[safe.get('source') as keyof typeof sourcePaths][lang];
    if (city) {
      field('planning_city')!.value = city[lang];
      const locations = field('locations');
      if (locations) locations.value = city[lang];
    }
    if (province) field('province')!.value = province;
    syncDetails();
  };
  applyContext();
  native.addEventListener('click', () => {
    // Preserve the provider's hosted challenge; never disable or bypass it.
    if (busy) return;
    const issues = validateRfq(new FormData(form), lang);
    if (Object.keys(issues).length) {
      showErrors(issues, m.summary);
      return;
    }
    field('request_id')!.value = requestId;
    measure('rfq_provider_handoff');
    HTMLFormElement.prototype.submit.call(form);
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    start();
    clear();
    field('request_id')!.value = requestId;
    const data = new FormData(form);
    const issues = validateRfq(data, lang);
    if (Object.keys(issues).length) {
      showErrors(issues, m.summary);
      measure('rfq_error', 'validation');
      return;
    }
    busy = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.hidden = false;
    status.textContent = m.sending;
    const result = await submitRfq(data, lang);
    busy = false;
    button.disabled = false;
    form.removeAttribute('aria-busy');
    status.hidden = true;
    if (result.kind === 'success') {
      measure('rfq_success');
      form.reset();
      applyContext();
      started = false;
      requestId = crypto.randomUUID();
      status.textContent = m.success;
      status.hidden = false;
      status.focus();
    } else {
      measure('rfq_error', result.verification ? 'verification' : 'provider');
      showErrors(result.fields, result.message);
      native.hidden = !result.verification;
    }
  });
  // Enable custom bilingual errors only after the complete enhancement is installed.
  form.noValidate = true;
}
