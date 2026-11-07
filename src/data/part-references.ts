import type { ModelId } from './model-options';
// Manufacturer reference numbers, not a Canadian stock or configuration claim.
export const partReferences: Partial<
  Record<
    ModelId,
    {
      adult: string;
      child: string;
      battery: string | null;
      source: string;
      reviewed: string;
    }
  >
> = {
  philips: {
    adult: 'M5071A',
    child: 'M5072A',
    battery: 'M5070A',
    source:
      'https://www.documents.philips.com/assets/20190118/1baa3fc1ee09422482c7a9d901209aff.pdf',
    reviewed: '2026-11-07',
  },
  frx: {
    adult: '989803139261',
    child: '989803139311',
    battery: 'M5070A',
    source:
      'https://www.documents.philips.com/assets/Instruction%20for%20Use/20210518/bbf1d8bda6e2442cb347ad2c002292ff.pdf?feed=ifu_docs_feed',
    reviewed: '2026-11-07',
  },
  view: {
    adult: 'DDP-2001',
    child: 'DDP-2002',
    battery: null,
    source: 'https://www.defibtech.com/products/lifeline-view-aed/',
    reviewed: '2026-11-07',
  },
};
