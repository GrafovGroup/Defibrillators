// Locations identify planning guides, not offices or confirmed service territories.
export const locationRoutes = {
  locations: {
    en: ['locations', 'AED planning across Canada'],
    fr: ['regions', 'Planifier un DEA au Canada'],
  },
  alberta: {
    en: ['locations/alberta', 'AED planning in Alberta'],
    fr: ['regions/alberta', 'Planifier un DEA en Alberta'],
  },
  bc: {
    en: ['locations/british-columbia', 'AED planning in British Columbia'],
    fr: [
      'regions/colombie-britannique',
      'Planifier un DEA en Colombie-Britannique',
    ],
  },
  manitoba: {
    en: ['locations/manitoba', 'AED planning in Manitoba'],
    fr: ['regions/manitoba', 'Planifier un DEA au Manitoba'],
  },
  nb: {
    en: ['locations/new-brunswick', 'AED planning in New Brunswick'],
    fr: ['regions/nouveau-brunswick', 'Planifier un DEA au Nouveau-Brunswick'],
  },
  nl: {
    en: [
      'locations/newfoundland-labrador',
      'AED planning in Newfoundland and Labrador',
    ],
    fr: [
      'regions/terre-neuve-labrador',
      'Planifier un DEA à Terre-Neuve-et-Labrador',
    ],
  },
  ns: {
    en: ['locations/nova-scotia', 'AED planning in Nova Scotia'],
    fr: ['regions/nouvelle-ecosse', 'Planifier un DEA en Nouvelle-Écosse'],
  },
  ontario: {
    en: ['locations/ontario', 'AED planning in Ontario'],
    fr: ['regions/ontario', 'Planifier un DEA en Ontario'],
  },
  pei: {
    en: [
      'locations/prince-edward-island',
      'AED planning in Prince Edward Island',
    ],
    fr: [
      'regions/ile-du-prince-edouard',
      'Planifier un DEA à l’Île-du-Prince-Édouard',
    ],
  },
  quebec: {
    en: ['locations/quebec', 'AED planning in Québec'],
    fr: ['regions/quebec', 'Planifier un DEA au Québec'],
  },
  saskatchewan: {
    en: ['locations/saskatchewan', 'AED planning in Saskatchewan'],
    fr: ['regions/saskatchewan', 'Planifier un DEA en Saskatchewan'],
  },
  nwt: {
    en: [
      'locations/northwest-territories',
      'AED planning in the Northwest Territories',
    ],
    fr: [
      'regions/territoires-du-nord-ouest',
      'Planifier un DEA aux Territoires du Nord-Ouest',
    ],
  },
  nunavut: {
    en: ['locations/nunavut', 'AED planning in Nunavut'],
    fr: ['regions/nunavut', 'Planifier un DEA au Nunavut'],
  },
  yukon: {
    en: ['locations/yukon', 'AED planning in Yukon'],
    fr: ['regions/yukon', 'Planifier un DEA au Yukon'],
  },
  toronto: {
    en: ['locations/ontario/toronto', 'AED planning in Toronto'],
    fr: ['regions/ontario/toronto', 'Planifier un DEA à Toronto'],
  },
  montreal: {
    en: ['locations/quebec/montreal', 'AED planning in Montréal'],
    fr: ['regions/quebec/montreal', 'Planifier un DEA à Montréal'],
  },
  vancouver: {
    en: ['locations/british-columbia/vancouver', 'AED planning in Vancouver'],
    fr: [
      'regions/colombie-britannique/vancouver',
      'Planifier un DEA à Vancouver',
    ],
  },
  calgary: {
    en: ['locations/alberta/calgary', 'AED planning in Calgary'],
    fr: ['regions/alberta/calgary', 'Planifier un DEA à Calgary'],
  },
} as const;
export type LocationId = keyof typeof locationRoutes;
const provinceByLocation: Partial<Record<LocationId, string>> = {
  alberta: 'AB',
  bc: 'BC',
  manitoba: 'MB',
  nb: 'NB',
  nl: 'NL',
  ns: 'NS',
  ontario: 'ON',
  pei: 'PE',
  quebec: 'QC',
  saskatchewan: 'SK',
  nwt: 'NT',
  nunavut: 'NU',
  yukon: 'YT',
  toronto: 'ON',
  montreal: 'QC',
  vancouver: 'BC',
  calgary: 'AB',
};
export function provinceForLocation(source: string): string | undefined {
  return Object.hasOwn(provinceByLocation, source)
    ? provinceByLocation[source as LocationId]
    : undefined;
}
