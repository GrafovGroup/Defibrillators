import { offeringRoutes } from './offering-routes.ts';
import type { Locale } from './content';
import { modelRoutes } from './model-options.ts';
import { locationRoutes } from './location-routes.ts';
export const routes = {
  ...locationRoutes,
  ...offeringRoutes,
  home: { en: ['', 'Home'], fr: ['', 'Accueil'] },
  search: {
    en: ['search', 'Search Defibrillators.ca'],
    fr: ['recherche', 'Rechercher sur Defibrillators.ca'],
  },
  defibrillators: {
    en: ['defibrillators', 'AED defibrillators'],
    fr: ['defibrillateurs', 'Défibrillateurs DEA'],
  },
  ...modelRoutes,
  compare: {
    en: ['defibrillators/compare', 'Compare AEDs'],
    fr: ['defibrillateurs/comparer', 'Comparer les DEA'],
  },
  parts: {
    en: ['accessories/find-parts', 'Find AED replacement parts'],
    fr: ['accessoires/trouver-pieces', 'Trouver des pièces de DEA'],
  },
  packages: {
    en: ['defibrillators/packages', 'Plan an AED package'],
    fr: ['defibrillateurs/ensembles', 'Planifier un ensemble de DEA'],
  },
  costs: {
    en: ['resources/aed-cost-ownership', 'AED costs & ownership budget'],
    fr: ['ressources/cout-dea-budget', 'Coût d’un DEA et budget de suivi'],
  },
  accessories: {
    en: ['accessories', 'AED accessories'],
    fr: ['accessoires', 'Accessoires de DEA'],
  },
  pads: {
    en: ['accessories/electrode-pads', 'Electrode pads'],
    fr: ['accessoires/electrodes', 'Électrodes'],
  },
  batteries: {
    en: ['accessories/batteries', 'AED batteries'],
    fr: ['accessoires/batteries', 'Batteries de DEA'],
  },
  cabinets: {
    en: ['accessories/cabinets', 'AED cabinets'],
    fr: ['accessoires/armoires', 'Armoires pour DEA'],
  },
  signage: {
    en: ['accessories/signage', 'AED signage'],
    fr: ['accessoires/signalisation', 'Signalisation de DEA'],
  },
  kits: {
    en: ['accessories/emergency-response-kits', 'Emergency response kits'],
    fr: ['accessoires/trousses-intervention', 'Trousses d’intervention'],
  },
  services: {
    en: ['services', 'AED services'],
    fr: ['services', 'Services de DEA'],
  },
  installation: {
    en: ['installation', 'AED installation'],
    fr: ['installation', 'Installation de DEA'],
  },
  maintenance: {
    en: ['maintenance', 'AED maintenance & inspections'],
    fr: ['entretien', 'Entretien et vérification des DEA'],
  },
  programs: {
    en: ['aed-programs', 'Multi-location AED programs'],
    fr: ['programmes-dea', 'Programmes de DEA multisites'],
  },
  training: {
    en: ['cpr-aed-training', 'CPR & AED training coordination'],
    fr: ['formation-rcr-dea', 'Coordination de formations en RCR et DEA'],
  },
  industries: {
    en: ['industries', 'AEDs for your industry'],
    fr: ['secteurs', 'Des DEA pour votre secteur'],
  },
  offices: {
    en: ['industries/offices', 'Offices & workplaces'],
    fr: ['secteurs/bureaux', 'Bureaux et milieux de travail'],
  },
  industrial: {
    en: ['industries/industrial-warehouses', 'Industrial sites & warehouses'],
    fr: ['secteurs/industries-entrepots', 'Industries et entrepôts'],
  },
  properties: {
    en: ['industries/property-management', 'Condos & property management'],
    fr: ['secteurs/gestion-immobiliere', 'Copropriétés et gestion immobilière'],
  },
  schools: {
    en: ['industries/schools', 'Schools & campuses'],
    fr: ['secteurs/ecoles', 'Écoles et campus'],
  },
  fitness: {
    en: ['industries/fitness-recreation', 'Fitness & recreation'],
    fr: ['secteurs/sports-loisirs', 'Sports et loisirs'],
  },
  hospitality: {
    en: ['industries/hospitality', 'Hotels & hospitality'],
    fr: ['secteurs/hotellerie', 'Hôtellerie et accueil'],
  },
  retail: {
    en: ['industries/retail', 'Retail & shopping centres'],
    fr: [
      'secteurs/commerce-detail',
      'Commerce de détail et centres commerciaux',
    ],
  },
  municipalities: {
    en: ['industries/municipalities', 'Municipalities & community spaces'],
    fr: ['secteurs/municipalites', 'Municipalités et espaces communautaires'],
  },
  residential: {
    en: ['industries/residential', 'Homes & families'],
    fr: ['secteurs/residentiel', 'Résidences et familles'],
  },
  resources: {
    en: ['resources', 'AED resources'],
    fr: ['ressources', 'Ressources sur les DEA'],
  },
  procurement: {
    en: ['procurement', 'Municipal & EMS procurement'],
    fr: ['approvisionnement', 'Achats municipaux et services préhospitaliers'],
  },
  mountCompatibility: {
    en: [
      'resources/defibrillator-mount-compatibility',
      'Defibrillator mount compatibility guide',
    ],
    fr: [
      'ressources/compatibilite-supports-defibrillateurs',
      'Compatibilité des supports de défibrillateurs',
    ],
  },
  about: {
    en: ['about', 'About Defibrillators.ca'],
    fr: ['a-propos', 'À propos de Defibrillators.ca'],
  },
  contact: { en: ['contact', 'Contact us'], fr: ['contact', 'Nous joindre'] },
  quote: {
    en: ['request-quote', 'Request a quote'],
    fr: ['demander-soumission', 'Demander une soumission'],
  },
  faq: {
    en: ['faqs', 'Frequently asked questions'],
    fr: ['questions-frequentes', 'Questions fréquentes'],
  },
  buying: {
    en: ['resources/aed-buying-guide', 'AED buying guide'],
    fr: ['ressources/guide-achat-dea', 'Guide d’achat d’un DEA'],
  },
  care: {
    en: ['resources/aed-maintenance-guide', 'AED readiness guide'],
    fr: ['ressources/guide-entretien-dea', 'Guide de vérification d’un DEA'],
  },
  privacy: {
    en: ['privacy', 'Privacy notice'],
    fr: ['confidentialite', 'Avis de confidentialité'],
  },
  terms: {
    en: ['terms', 'Website terms'],
    fr: ['conditions', 'Conditions d’utilisation'],
  },
  accessibility: {
    en: ['accessibility', 'Accessibility statement'],
    fr: ['accessibilite', 'Déclaration d’accessibilité'],
  },
} as const;
export type PageId = keyof typeof routes;
export const pathFor = (id: PageId, lang: Locale): string =>
  `/${lang}/${routes[id][lang][0]}${id === 'home' ? '' : '/'}`;
export const labelFor = (id: PageId, lang: Locale): string =>
  routes[id][lang][1];
export const navIds: PageId[] = [
  'defibrillators',
  'accessories',
  'installation',
  'maintenance',
  'programs',
  'industries',
  'resources',
  'contact',
];
export const serviceIds: PageId[] = [
  'installation',
  'maintenance',
  'programs',
  'training',
];
export const industryIds: PageId[] = [
  'offices',
  'industrial',
  'properties',
  'schools',
  'fitness',
  'hospitality',
  'retail',
  'municipalities',
  'residential',
];
export const accessoryIds: PageId[] = [
  'pads',
  'batteries',
  'cabinets',
  'signage',
  'kits',
];
export const footerIds: PageId[] = [
  'locations',
  'about',
  'quote',
  'faq',
  'privacy',
  'terms',
  'accessibility',
];
