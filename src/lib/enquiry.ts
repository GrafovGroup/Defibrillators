import { pathFor, type PageId } from '../data/routes';
import type { Locale } from '../data/content';
export function enquiryPath(page: PageId, lang: Locale): string {
  const params = new URLSearchParams();
  if (page === 'zoll' || page === 'philips') params.set('model', page);
  const service = [
    'installation',
    'maintenance',
    'programs',
    'training',
  ].includes(page);
  params.set(
    'request',
    service
      ? page
      : [
            'accessories',
            'pads',
            'batteries',
            'cabinets',
            'signage',
            'kits',
          ].includes(page)
        ? 'accessories'
        : 'equipment',
  );
  if (page === 'residential') params.set('audience', 'residential');
  params.set('source', page);
  return `${pathFor('quote', lang)}?${params}#rfq`;
}
