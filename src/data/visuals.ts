import assets from './visual-assets.json' with { type: 'json' };
import type { Locale } from './content';
import type { PageId } from './routes';

export interface Visual {
  src: string;
  width: number;
  height: number;
  variants: { src: string; width: number; height: number }[];
  kind: string;
  fit: string;
  alt: Record<Locale, string>;
  credit?: { label: string; url: string; license: string; licenseUrl: string };
}
export const visuals: Record<string, Visual> = assets;
export const pageVisuals: Partial<Record<PageId, string>> = {
  zoll3: 'visuals/zoll3',
  cr2: 'visuals/cr2',
  heartsine: 'visuals/heartsine',
  g5: 'visuals/g5',
  maintenance: 'visuals/maintenance',
  programs: 'visuals/programs',
  training: 'visuals/training',
  services: 'visuals/services',
  accessories: 'visuals/accessories',
  batteries: 'visuals/batteries',
  signage: 'visuals/signage',
  kits: 'visuals/kits',
  parts: 'visuals/parts',
  packages: 'visuals/packages',
  siteAssessment: 'visuals/site-assessment',
  cabinetMounting: 'visuals/cabinet-mounting',
  readinessInspection: 'visuals/readiness-inspection',
  expiryTracking: 'visuals/expiry-tracking',
  postUse: 'visuals/post-use',
  assetInventory: 'visuals/asset-inventory',
  adultPads: 'visuals/adult-pads',
  paediatricPads: 'visuals/paediatric-pads',
  padBatteryPacks: 'visuals/pad-battery-packs',
  trainingDevices: 'visuals/training-devices',
  carryCases: 'visuals/carry-cases',
  outdoorCabinets: 'visuals/outdoor-cabinets',
  defibrillators: 'visuals/defibrillators',
  compare: 'visuals/compare',
  industries: 'visuals/industries',
  offices: 'visuals/offices',
  industrial: 'visuals/industrial',
  properties: 'visuals/properties',
  schools: 'visuals/schools',
  fitness: 'visuals/fitness',
  hospitality: 'visuals/hospitality',
  retail: 'visuals/retail',
  municipalities: 'visuals/municipalities',
  residential: 'visuals/residential',
  resources: 'visuals/resources',
  about: 'visuals/about',
  buying: 'visuals/buying',
  costs: 'visuals/costs',
  installation: 'visuals/installation',
  zoll: 'visuals/zoll-aed-plus',
  philips: 'visuals/philips-heartstart-case',
  frx: 'visuals/philips-frx-case',
  view: 'visuals/lifeline-view',
  pads: 'visuals/electrode-pads',
  cabinets: 'visuals/aed-cabinet',
  care: 'visuals/aed-care',
};

export const visualCaption = (visual: Visual, lang: Locale) =>
  visual.kind === 'context'
    ? lang === 'en'
      ? 'AI-generated setting · see manufacturer reference for device appearance'
      : 'Scène générée par IA · voir le fabricant pour l’apparence de l’appareil'
    : visual.kind === 'generated'
      ? lang === 'en'
        ? 'AI-generated illustration · equipment and service scope to confirm'
        : 'Illustration générée par IA · équipement et portée du service à confirmer'
      : lang === 'en'
        ? 'Reference photograph · exact equipment and configuration to confirm'
        : 'Photo de référence · équipement et configuration exacts à confirmer';
