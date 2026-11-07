import {
  validateRfq,
  submitRfq,
  messages,
  type FieldErrors,
  type RfqLocale,
} from '../lib/rfq';
import { safeEnquiryParams } from '../lib/enquiry-context';
import { pathFor, type PageId } from '../data/routes';
import { provinceForLocation } from '../data/location-routes';
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
  let requestId = crypto.randomUUID();
  const controls = () =>
    Array.from(
      form.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >('input, select, textarea'),
    );
  const field = (name: string) =>
    controls().find((control) => control.name === name);
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
  if (safe.has('model')) field('model')!.value = safe.get('model')!;
  if (safe.has('request')) field('request_type')!.value = safe.get('request')!;
  if (safe.has('part')) field('accessory_type')!.value = safe.get('part')!;
  if (safe.has('package')) field('package')!.value = safe.get('package')!;
  const syncDetails = () => {
    for (const group of form.querySelectorAll<HTMLFieldSetElement>(
      '[data-request-details]',
    )) {
      const relevant = group.dataset
        .requestDetails!.split(' ')
        .includes(field('request_type')!.value);
      group.hidden = !relevant;
      group.disabled = !relevant;
    }
  };
  field('request_type')!.addEventListener('change', syncDetails);
  syncDetails();
  if (safe.has('source'))
    field('source_page')!.value = pathFor(safe.get('source') as PageId, lang);
  const province = provinceForLocation(safe.get('source') ?? '');
  if (province) field('province')!.value = province;
  native.addEventListener('click', () => {
    // Preserve the provider's hosted challenge; never disable or bypass it.
    if (busy) return;
    const issues = validateRfq(new FormData(form), lang);
    if (Object.keys(issues).length) {
      showErrors(issues, m.summary);
      return;
    }
    field('request_id')!.value = requestId;
    HTMLFormElement.prototype.submit.call(form);
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy) return;
    clear();
    field('request_id')!.value = requestId;
    const data = new FormData(form);
    const issues = validateRfq(data, lang);
    if (Object.keys(issues).length) {
      showErrors(issues, m.summary);
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
      form.reset();
      syncDetails();
      requestId = crypto.randomUUID();
      status.textContent = m.success;
      status.hidden = false;
      status.focus();
    } else {
      showErrors(result.fields, result.message);
      native.hidden = !result.verification;
    }
  });
  // Enable custom bilingual errors only after the complete enhancement is installed.
  form.noValidate = true;
}
