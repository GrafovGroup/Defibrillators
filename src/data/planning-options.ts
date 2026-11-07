// Stable, non-sensitive values shared by links, RFQ validation and visible controls.
export const partOptions = [
  { id: 'pads', en: 'Electrode pads', fr: 'Électrodes' },
  { id: 'battery', en: 'Battery', fr: 'Batterie' },
  {
    id: 'refresh',
    en: 'Pads and battery together',
    fr: 'Électrodes et batterie ensemble',
  },
  {
    id: 'cabinet',
    en: 'Cabinet or carry case',
    fr: 'Armoire ou étui de transport',
  },
  {
    id: 'signage',
    en: 'Signage or response kit',
    fr: 'Signalisation ou trousse d’intervention',
  },
  { id: 'trainer', en: 'Training equipment', fr: 'Équipement de formation' },
] as const;
export const packageOptions = [
  {
    id: 'workplace',
    en: 'Workplace or community space',
    fr: 'Milieu de travail ou espace communautaire',
  },
  { id: 'home', en: 'Home and family', fr: 'Résidence et famille' },
  {
    id: 'mobile',
    en: 'Mobile or outdoor project',
    fr: 'Projet mobile ou extérieur',
  },
  { id: 'multisite', en: 'Multiple locations', fr: 'Plusieurs emplacements' },
] as const;
export const trainingOptions = {
  training_language: [
    { id: 'en', en: 'English', fr: 'Anglais' },
    { id: 'fr', en: 'French', fr: 'Français' },
    { id: 'bilingual', en: 'Bilingual group', fr: 'Groupe bilingue' },
  ],
  training_format: [
    {
      id: 'onsite',
      en: 'In person at our location',
      fr: 'En personne à notre emplacement',
    },
    {
      id: 'blended',
      en: 'Blended, if available',
      fr: 'Hybride, si disponible',
    },
  ],
  training_course: [
    { id: 'initial', en: 'Initial training', fr: 'Formation initiale' },
    {
      id: 'renewal',
      en: 'Recertification',
      fr: 'Renouvellement de certification',
    },
  ],
} as const;
