import { pageVisuals, visuals } from './visuals.ts';
import type { Localized } from './pages';
import type { PageId } from './routes';
import type { ModelId } from './model-options';
export interface ProductReference {
  id: ModelId;
  guidanceMode: 'voice' | 'feedback' | 'video';
  manufacturer: string;
  model: string;
  image: string | null;
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
  } | null;
}
const references = [
  {
    id: 'zoll',
    guidanceMode: 'feedback',
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
    guidanceMode: 'voice',
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
  {
    id: 'zoll3',
    manufacturer: 'ZOLL',
    model: 'AED 3',
    guidanceMode: 'feedback',
    image: null,
    source: {
      label: 'ZOLL — AED 3',
      url: 'https://www.zoll.com/en-us/products/emergency-care/aeds/zoll-aed-3',
      reviewed: '2026-11-07',
    },
    guidance: {
      en: 'Colour display and Real CPR Help compression feedback. Confirm the exact configuration and language options.',
      fr: 'Écran couleur et rétroaction Real CPR Help sur les compressions. Confirmez la configuration exacte et les langues.',
    },
    electrodes: {
      en: 'CPR Uni-padz are designed for adult and paediatric use with the AED 3; confirm the current instructions and supplied accessories.',
      fr: 'Les CPR Uni-padz sont conçues pour adultes et enfants avec le DEA AED 3; confirmez les instructions actuelles et les accessoires fournis.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['parts', 'pads', 'batteries'],
  },
  {
    id: 'frx',
    manufacturer: 'Philips',
    model: 'HeartStart FRx',
    guidanceMode: 'voice',
    image: null,
    source: {
      label: 'Philips — HeartStart FRx',
      url: 'https://www.usa.philips.com/healthcare/product/HC861304/heartstart-frx-automated-external-defibrillator',
      reviewed: '2026-11-07',
    },
    guidance: {
      en: 'Voice instructions, visual icons and a CPR metronome; an optional infant/child key changes the guidance and therapy.',
      fr: 'Instructions vocales, pictogrammes et métronome de RCR; une clé nourrisson/enfant facultative adapte le guidage et le traitement.',
    },
    electrodes: {
      en: 'SMART Pads II; the optional infant/child key is a separate item to confirm in the quote. HS1 cartridges are not the FRx pad format.',
      fr: 'SMART Pads II; la clé nourrisson/enfant facultative est un article distinct à confirmer dans la soumission. Les cartouches HS1 ne sont pas le format d’électrodes du FRx.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['parts', 'pads', 'batteries'],
  },
  {
    id: 'cr2',
    manufacturer: 'Stryker',
    model: 'LIFEPAK CR2',
    guidanceMode: 'voice',
    image: null,
    source: {
      label: 'Stryker — LIFEPAK CR2',
      url: 'https://www.stryker.com/us/en/emergency-care/products/lifepak-cr2.html',
      reviewed: '2026-11-07',
    },
    guidance: {
      en: 'Voice guidance with child mode. Bilingual and connectivity features depend on the selected configuration.',
      fr: 'Guidage vocal avec mode enfant. Les fonctions bilingues et de connectivité dépendent de la configuration choisie.',
    },
    electrodes: {
      en: 'QUIK-STEP electrodes and a child-mode function; confirm the exact replacement electrode tray and battery with the supplier.',
      fr: 'Électrodes QUIK-STEP et fonction de mode enfant; confirmez le plateau d’électrodes et la batterie de remplacement exacts avec le fournisseur.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['parts', 'pads', 'batteries'],
  },
  {
    id: 'heartsine',
    manufacturer: 'HeartSine',
    model: 'samaritan PAD 350P',
    guidanceMode: 'voice',
    image: null,
    source: {
      label: 'HeartSine — samaritan PAD 350P',
      url: 'https://www.stryker.com/us/en/emergency-care/products/heartsine-samaritan-pad-360p.html',
      reviewed: '2026-11-07',
    },
    guidance: {
      en: 'Visual and voice prompts in a semi-automatic device. The 350P uses a shock button; it is distinct from the fully automatic 360P.',
      fr: 'Messages visuels et vocaux dans un appareil semi-automatique. Le 350P utilise un bouton de choc; il se distingue du 360P entièrement automatique.',
    },
    electrodes: {
      en: 'Confirm the applicable adult Pad-Pak or Pediatric-Pak and check current manufacturer notices for the exact unit and supplies.',
      fr: 'Confirmez le Pad-Pak adulte ou Pediatric-Pak applicable et consultez les avis actuels du fabricant pour l’appareil et les fournitures exacts.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['parts', 'pads', 'batteries'],
  },
  {
    id: 'g5',
    manufacturer: 'ZOLL',
    model: 'Powerheart G5',
    guidanceMode: 'feedback',
    image: null,
    source: {
      label: 'ZOLL — Powerheart G5',
      url: 'https://candistributor.zoll.com/en-CA/powerheart-g5',
      reviewed: '2026-11-07',
    },
    guidance: {
      en: 'RescueCoach voice and text prompts, a language-switch function and an optional CPR feedback device.',
      fr: 'Messages vocaux et textuels RescueCoach, changement de langue et dispositif facultatif de rétroaction de RCR.',
    },
    electrodes: {
      en: 'Ask which G5 electrode option and optional feedback device are included. Confirm paediatric supplies and exact battery compatibility.',
      fr: 'Demandez quelles électrodes G5 et quel dispositif facultatif de rétroaction sont inclus. Confirmez les fournitures pédiatriques et la compatibilité exacte de la batterie.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['parts', 'pads', 'batteries'],
  },
  {
    id: 'view',
    manufacturer: 'Defibtech',
    model: 'Lifeline VIEW',
    guidanceMode: 'video',
    image: null,
    source: {
      label: 'Defibtech — Lifeline VIEW',
      url: 'https://www.defibtech.com/products/lifeline-view-aed/',
      reviewed: '2026-11-07',
    },
    guidance: {
      en: 'A colour screen provides video guidance alongside voice prompts and a CPR metronome.',
      fr: 'Un écran couleur offre un guidage vidéo, accompagné de messages vocaux et d’un métronome de RCR.',
    },
    electrodes: {
      en: 'The manufacturer lists separate adult and child/infant pads. Confirm VIEW-specific supplies; do not infer compatibility from the Lifeline family name.',
      fr: 'Le fabricant indique des électrodes distinctes pour adultes et enfants/nourrissons. Confirmez les fournitures du VIEW; le nom de famille Lifeline ne suffit pas à établir la compatibilité.',
    },
    licensing: 'unverified',
    availability: 'unconfirmed',
    price: null,
    warranty: null,
    related: ['parts', 'pads', 'batteries'],
  },
];

export const products: ProductReference[] = references.map((reference) => ({
  ...reference,
  id: reference.id as ProductReference['id'],
  image:
    visuals[pageVisuals[reference.id as ModelId]!]!.kind === 'reference'
      ? pageVisuals[reference.id as ModelId]!
      : null,
  guidanceMode: reference.guidanceMode as ProductReference['guidanceMode'],
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
  imageProvenance: (() => {
    const credit = visuals[pageVisuals[reference.id as ModelId]!]!.credit;
    return credit
      ? {
          sourceUrl: credit.url,
          author: credit.label,
          licence: credit.license,
          licenceUrl: credit.licenseUrl,
          exactSuppliedConfiguration: false as const,
        }
      : null;
  })(),
}));
