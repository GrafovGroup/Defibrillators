import type { Localized, pageImages } from './pages';
import type { PageId } from './routes';
export interface ProductReference {
  id: 'zoll' | 'philips';
  manufacturer: string;
  model: string;
  image: keyof typeof pageImages;
  source: { label: string; url: string; reviewed: string };
  guidance: Localized<string>;
  electrodes: Localized<string>;
  licensing: 'unverified';
  availability: 'unconfirmed';
  price: null;
  warranty: null;
  related: PageId[];
}
export const products: ProductReference[] = [
  {
    id: 'zoll',
    manufacturer: 'ZOLL',
    model: 'AED Plus',
    image: 'readiness',
    source: {
      label: 'ZOLL — AED Plus',
      url: 'https://candistributor.zoll.com/en-CA/aed-plus',
      reviewed: '2026-11-06',
    },
    guidance: {
      en: 'Audio and visual prompts; adult compression feedback with CPR-D-padz.',
      fr: 'Messages sonores et visuels; rétroaction sur les compressions pour adultes avec CPR-D-padz.',
    },
    electrodes: {
      en: 'CPR-D-padz for adult feedback; confirm the exact adult or paediatric configuration.',
      fr: 'CPR-D-padz pour la rétroaction adulte; confirmer la configuration adulte ou pédiatrique exacte.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['pads', 'batteries'],
  },
  {
    id: 'philips',
    manufacturer: 'Philips',
    model: 'HeartStart HS1',
    image: 'philips-reference',
    source: {
      label: 'Philips — HeartStart OnSite (HS1)',
      url: 'https://www.usa.philips.com/healthcare/product/HCM5066A/heartstart-onsite-hs1',
      reviewed: '2026-11-06',
    },
    guidance: {
      en: 'Step-by-step voice instructions and a CPR metronome.',
      fr: 'Instructions vocales par étapes et métronome de RCR.',
    },
    electrodes: {
      en: 'SMART Pads cartridges; adult and infant/child supplies are separate.',
      fr: 'Cartouches SMART Pads; fournitures distinctes pour adultes et nourrissons/enfants.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['pads', 'batteries'],
  },
];
