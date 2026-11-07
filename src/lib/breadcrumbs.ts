import { pageFor } from '../data/pages.ts';
import type { PageId } from '../data/routes';

export function breadcrumbIds(id: PageId): PageId[] {
  if (id === 'home') return ['home'];
  const trail: PageId[] = [];
  const seen = new Set<PageId>();
  let current: PageId | undefined = id;
  while (current && current !== 'home') {
    if (seen.has(current)) throw new Error(`Cyclic page ancestry: ${current}`);
    seen.add(current);
    trail.unshift(current);
    current = pageFor(current).parent;
  }
  return ['home', ...trail];
}
