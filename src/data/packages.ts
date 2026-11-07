export const packages = [
  {
    id: 'workplace',
    title: {
      en: 'Workplace & community',
      fr: 'Milieu de travail et communauté',
    },
    body: {
      en: 'Plan a visible, accessible AED station and a clear handover to the people responsible for it.',
      fr: 'Prévoyez un poste de DEA visible et accessible, ainsi qu’une remise claire aux responsables.',
    },
    items: {
      en: [
        'AED configuration and language needs',
        'Compatible pads, battery, cabinet and signage',
        'Installation scope and staff training needs',
        'Named owner, check record and replacement process',
      ],
      fr: [
        'Configuration du DEA et besoins linguistiques',
        'Électrodes, batterie, armoire et signalisation compatibles',
        'Portée de l’installation et besoins de formation',
        'Responsable, registre de vérification et procédure de remplacement',
      ],
    },
  },
  {
    id: 'home',
    title: {
      en: 'Home & family',
      fr: 'Résidence et famille',
    },
    body: {
      en: 'Keep the request simple: your province, intended storage, language needs and the support your household would like.',
      fr: 'Simplifiez la demande : province, rangement prévu, langues et accompagnement souhaité par votre famille.',
    },
    items: {
      en: [
        'Device and appropriate adult or paediatric supplies',
        'Accessible storage and carry case, if needed',
        'Training coordination for household members',
        'Clear instructions and a replacement-supply record',
      ],
      fr: [
        'Appareil et fournitures adultes ou pédiatriques appropriées',
        'Rangement accessible et étui, au besoin',
        'Coordination de formation pour la famille',
        'Instructions claires et registre des fournitures à remplacer',
      ],
    },
  },
  {
    id: 'mobile',
    title: {
      en: 'Mobile & outdoor projects',
      fr: 'Projets mobiles et extérieurs',
    },
    body: {
      en: 'Start with the conditions, not a ruggedness claim. Storage temperature, weather exposure, power and access need a site-specific review.',
      fr: 'Commencez par les conditions, pas par une promesse de robustesse. Température de rangement, intempéries, alimentation et accès nécessitent une analyse du lieu.',
    },
    items: {
      en: [
        'Where the AED is stored and transported',
        'Manufacturer operating and standby limits',
        'Suitable enclosure and power, if required',
        'Who checks access, condition and supplies',
      ],
      fr: [
        'Lieu de rangement et de transport du DEA',
        'Limites de fonctionnement et de veille du fabricant',
        'Boîtier et alimentation appropriés, si requis',
        'Responsable de l’accès, de l’état et des fournitures',
      ],
    },
  },
  {
    id: 'multisite',
    title: {
      en: 'Multiple locations',
      fr: 'Plusieurs emplacements',
    },
    body: {
      en: 'Bring each location into one purchasing brief, while keeping local responsibilities and delivery requirements clear.',
      fr: 'Regroupez les emplacements dans un même dossier d’achat, en précisant les responsabilités locales et les exigences de livraison.',
    },
    items: {
      en: [
        'Site list, quantities and existing models',
        'Consistent configurations where appropriate',
        'Local installation and training requirements',
        'Asset register, replacement schedule and agreed support scope',
      ],
      fr: [
        'Liste des sites, quantités et modèles existants',
        'Configurations cohérentes lorsque pertinentes',
        'Installation et formation requises par site',
        'Registre, calendrier de remplacement et soutien convenu',
      ],
    },
  },
] as const;
