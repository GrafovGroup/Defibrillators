export const offeringRoutes = {
  siteAssessment: {
    en: [
      'services/aed-site-assessment',
      'AED site assessment & placement planning',
    ],
    fr: [
      'services/evaluation-emplacement-dea',
      'Évaluation des lieux et emplacement du DEA',
    ],
  },
  cabinetMounting: {
    en: ['services/aed-cabinet-mounting', 'AED cabinet mounting coordination'],
    fr: [
      'services/fixation-armoire-dea',
      'Coordination de la fixation d’armoire de DEA',
    ],
  },
  readinessInspection: {
    en: [
      'services/aed-readiness-inspection',
      'AED readiness inspection planning',
    ],
    fr: [
      'services/verification-etat-dea',
      'Planifier la vérification de l’état du DEA',
    ],
  },
  expiryTracking: {
    en: ['services/aed-expiry-tracking', 'AED pad & battery expiry tracking'],
    fr: [
      'services/suivi-echeances-dea',
      'Suivi des échéances des électrodes et batteries',
    ],
  },
  postUse: {
    en: ['services/aed-post-use-replenishment', 'AED replenishment after use'],
    fr: [
      'services/reapprovisionnement-dea-apres-utilisation',
      'Réapprovisionnement du DEA après utilisation',
    ],
  },
  assetInventory: {
    en: ['services/aed-asset-inventory', 'AED inventory & multi-site records'],
    fr: [
      'services/inventaire-dea-multisite',
      'Inventaire et dossiers de DEA multisites',
    ],
  },
  adultPads: {
    en: ['accessories/adult-aed-pads', 'Adult AED replacement pads'],
    fr: [
      'accessoires/electrodes-dea-adultes',
      'Électrodes de remplacement pour adultes',
    ],
  },
  paediatricPads: {
    en: [
      'accessories/paediatric-aed-pads-keys',
      'Paediatric AED pads & child keys',
    ],
    fr: [
      'accessoires/electrodes-cles-pediatriques-dea',
      'Électrodes et clés pédiatriques pour DEA',
    ],
  },
  padBatteryPacks: {
    en: [
      'accessories/combined-pad-battery-packs',
      'Combined AED pad & battery packs',
    ],
    fr: [
      'accessoires/blocs-electrodes-batterie-dea',
      'Blocs combinés d’électrodes et batterie',
    ],
  },
  trainingDevices: {
    en: ['accessories/aed-trainers', 'AED trainers & training supplies'],
    fr: [
      'accessoires/simulateurs-dea',
      'Simulateurs de DEA et matériel de formation',
    ],
  },
  carryCases: {
    en: ['accessories/aed-carry-cases', 'AED carrying cases'],
    fr: ['accessoires/etuis-transport-dea', 'Étuis de transport pour DEA'],
  },
  outdoorCabinets: {
    en: ['accessories/outdoor-aed-cabinets', 'Outdoor AED cabinet planning'],
    fr: [
      'accessoires/armoires-exterieures-dea',
      'Planifier une armoire extérieure pour DEA',
    ],
  },
} as const;
export type OfferingId = keyof typeof offeringRoutes;
export const offeringIds = Object.keys(offeringRoutes) as OfferingId[];
// Enquiry routing is explicit; a service subpage must not become an equipment request.
export const offeringRequests = {
  siteAssessment: { request: 'installation' },
  cabinetMounting: { request: 'installation' },
  readinessInspection: { request: 'maintenance' },
  expiryTracking: { request: 'programs' },
  postUse: { request: 'maintenance' },
  assetInventory: { request: 'programs' },
  adultPads: { request: 'accessories', part: 'pads' },
  paediatricPads: { request: 'accessories', part: 'pads' },
  padBatteryPacks: { request: 'accessories', part: 'refresh' },
  trainingDevices: { request: 'accessories', part: 'trainer' },
  carryCases: { request: 'accessories', part: 'cabinet' },
  outdoorCabinets: { request: 'accessories', part: 'cabinet' },
} as const;
