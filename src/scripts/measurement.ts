import { emitMeasurement } from '../lib/measurement';
import { safeEnquiryParams } from '../lib/enquiry-context';

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') ?? '';
  const channel = href.startsWith('tel:')
    ? 'phone'
    : href.startsWith('mailto:')
      ? 'email'
      : undefined;
  if (!channel) return;
  const safe = safeEnquiryParams(new URLSearchParams(location.search));
  emitMeasurement('contact_click', {
    page: document.body.dataset.page,
    language: document.body.dataset.language,
    city: safe.get('city') ?? document.body.dataset.page,
    channel,
  });
});
