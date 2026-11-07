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
  productType: 'aed' | 'accessory';
  environments: ('indoor' | 'outdoor' | 'unverified')[];
  intendedSettings: Localized<string>;
  description: Localized<string>;
  specifications: {
    label: Localized<string>;
    value: Localized<string>;
    sourceUrl: string;
  }[];
  includedComponents: string[] | null;
  compatibility: {
    pads: Localized<string>;
    batteryPartNumber: string | null;
    status: 'configuration-review-required';
  };
  canadianLicence: {
    status: 'unverified';
    licenceNumber: string | null;
    deviceIdentifier: string | null;
    checkedAt: string | null;
  };
  quoteOnly: boolean;
  imageProvenance: {
    sourceUrl: string;
    author: string;
    licence: string;
    licenceUrl: string;
    exactSuppliedConfiguration: false;
  };
}
const references = [
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

export const products: ProductReference[] = references.map((reference) => ({
  ...reference,
  id: reference.id as ProductReference['id'],
  image: reference.image as ProductReference['image'],
  related: reference.related as PageId[],
  licensing: 'unverified',
  availability: 'unconfirmed',
  productType: 'aed',
  environments: ['unverified'],
  intendedSettings: {
    en: 'The intended location and exact Canadian configuration require review before a recommendation.',
    fr: 'L’emplacement prévu et la configuration canadienne exacte doivent être examinés avant toute recommandation.',
  },
  description: reference.guidance,
  specifications: [
    {
      label: { en: 'Responder guidance', fr: 'Guidage du secouriste' },
      value: reference.guidance,
      sourceUrl: reference.source.url,
    },
  ],
  includedComponents: null,
  compatibility: {
    pads: reference.electrodes,
    batteryPartNumber: null,
    status: 'configuration-review-required',
  },
  canadianLicence: {
    status: 'unverified',
    licenceNumber: null,
    deviceIdentifier: null,
    checkedAt: null,
  },
  quoteOnly: true,
  imageProvenance:
    reference.id === 'zoll'
      ? {
          sourceUrl:
            'https://commons.wikimedia.org/wiki/File:Zoll_AED_Plus_units.png',
          author: 'Taylor Montgomery',
          licence: 'CC BY-SA 4.0',
          licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          exactSuppliedConfiguration: false,
        }
      : {
          sourceUrl:
            'https://commons.wikimedia.org/wiki/File:PhilipsAED-ZRS.jpg',
          author: 'GoTheMean / Wikimedia Commons',
          licence: 'CC0 1.0',
          licenceUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
          exactSuppliedConfiguration: false,
        },
}));
