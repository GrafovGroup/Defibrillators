import { modelIds, type ModelId } from '../data/model-options.ts';
import { pathFor, type PageId } from '../data/routes.ts';
import type { Locale } from '../data/content';
export function enquiryPath(page: PageId, lang: Locale): string {
  const params = new URLSearchParams();
  if (modelIds.includes(page as ModelId)) params.set('model', page);
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
            'parts',
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
