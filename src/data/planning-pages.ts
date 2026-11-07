import type { DetailPage } from './pages';
export const planningPages: DetailPage[] = [
  {
    id: 'parts',
    parent: 'accessories',
    kind: 'parts',
    intro: {
      en: 'Find the right starting point for replacement pads, batteries and AED accessories. Choose your exact model, then send a compatibility enquiry.',
      fr: 'Trouvez le bon point de départ pour les électrodes, batteries et accessoires de remplacement. Choisissez le modèle exact, puis demandez une vérification de compatibilité.',
    },
    sections: {
      en: [
        {
          heading: 'How do I identify the right replacement part?',
          body: 'Use the exact model name on the device and the part reference on the existing packaging. A similar connector, colour or brand name does not establish compatibility. Include the reference in your enquiry; we confirm the proposed replacement before an order.',
        },
        {
          heading: 'What should I send?',
          body: 'Include the model, part reference, quantity, province and whether the supplies are for adults, children or training. A clear product-label photo can help; keep medical or incident information out of the attachment.',
        },
        {
          heading: 'Can I replace pads and batteries together?',
          body: 'Ask for both in one enquiry when needed. Some systems use a combined consumable pack, while others have separate items and replacement schedules. Confirm the correct components and dates for your unit.',
        },
      ],
      fr: [
        {
          heading: 'Comment identifier la bonne pièce?',
          body: 'Utilisez le nom exact du modèle sur l’appareil et la référence sur l’emballage existant. Un connecteur, une couleur ou une marque semblable ne prouve pas la compatibilité. Ajoutez la référence à votre demande; le remplacement proposé sera confirmé avant la commande.',
        },
        {
          heading: 'Quels renseignements fournir?',
          body: 'Indiquez le modèle, la référence, la quantité, la province et l’usage adulte, pédiatrique ou de formation. Une photo claire de l’étiquette peut aider; excluez tout renseignement médical ou d’incident.',
        },
        {
          heading: 'Puis-je remplacer les électrodes et la batterie ensemble?',
          body: 'Demandez les deux dans une même requête au besoin. Certains systèmes utilisent un bloc combiné, d’autres des articles distincts avec des calendriers différents. Confirmez les composants et les dates de votre appareil.',
        },
      ],
    },
    related: ['pads', 'batteries', 'cabinets', 'care'],
  },
  {
    id: 'packages',
    parent: 'defibrillators',
    kind: 'packages',
    intro: {
      en: 'Build an AED equipment and support brief for a workplace, home, mobile project or multiple locations. Each package is scoped and quoted for your needs.',
      fr: 'Préparez un dossier d’équipement et de soutien pour un lieu de travail, une résidence, un projet mobile ou plusieurs sites. Chaque ensemble est défini et chiffré selon vos besoins.',
    },
    sections: {
      en: [
        {
          heading: 'What belongs in an AED package?',
          body: 'Define the device, compatible consumables, storage, signage and response supplies. Then decide which installation, training and ongoing support tasks should be quoted. The planning lists above are options to discuss, not a promise of included items.',
        },
        {
          heading: 'What happens after I request a package?',
          body: 'We review your location and requirements, clarify missing details and prepare a written scope. Confirm the exact model, Canadian licensing, availability, included items, price, delivery, warranty and service arrangements before accepting an order.',
        },
        {
          heading: 'What is different for outdoor storage?',
          body: 'A device’s dust or water resistance does not by itself establish suitability for year-round outdoor storage in Canada. Review its temperature limits, the enclosure, power needs and access arrangements before selecting equipment.',
        },
      ],
      fr: [
        {
          heading: 'Que comprend un ensemble de DEA?',
          body: 'Définissez l’appareil, les consommables compatibles, le rangement, la signalisation et les fournitures. Déterminez ensuite les tâches d’installation, de formation et de suivi à chiffrer. Les listes ci-dessus sont des options à discuter, pas une promesse d’articles inclus.',
        },
        {
          heading: 'Que se passe-t-il après une demande?',
          body: 'Nous examinons votre emplacement et vos besoins, précisons les renseignements manquants et préparons une portée écrite. Confirmez le modèle exact, l’homologation canadienne, la disponibilité, les articles inclus, le prix, la livraison, la garantie et les services avant d’accepter une commande.',
        },
        {
          heading: 'Qu’est-ce qui change pour le rangement extérieur?',
          body: 'La résistance à la poussière ou à l’eau ne suffit pas à établir qu’un appareil convient au rangement extérieur à l’année au Canada. Examinez les limites de température, le boîtier, l’alimentation et l’accès avant de choisir.',
        },
      ],
    },
    related: ['costs', 'compare', 'installation', 'programs'],
  },
  {
    id: 'costs',
    parent: 'resources',
    kind: 'guide',
    intro: {
      en: 'Budget for the complete AED program: equipment, installation, replacement supplies, training and agreed support. Compare written quotes with the same scope.',
      fr: 'Prévoyez le programme de DEA complet : équipement, installation, remplacements, formation et soutien convenu. Comparez des soumissions écrites de même portée.',
    },
    sections: {
      en: [
        {
          heading: 'How much does an AED package cost?',
          body: 'The amount depends on the exact configuration, quantity and services. Ask for an itemized quote that separates one-time equipment and setup from recurring or replacement costs.',
        },
        {
          heading: 'Build a five-year planning budget',
          body: 'Choose a planning period and add the following quoted costs. Five years is a budgeting example, not a claimed device life or replacement interval. Use the actual manufacturer schedule and your expected requirements.',
          bullets: [
            'Initial equipment: device, compatible consumables, cabinet or case, signage and kit',
            'Setup: installation, site requirements and handover',
            'Replacement supplies: documented dates and contingencies after use',
            'Training: provider, course, group size, travel and renewal requirements',
            'Ongoing support: agreed checks, records and any confirmed software fees',
            'Delivery, applicable taxes and other quoted charges',
          ],
        },
        {
          heading: 'Compare the same scope',
          body: 'Two quotes are comparable only when the model, version, included supplies, language configuration, quantities and support terms align. Separate optional items from included items and record exclusions. Ask who provides warranty service and whether shipping or return conditions affect your purchase.',
        },
        {
          heading: 'Plan for more than one site',
          body: 'List each address, device quantity and existing model. Separate shared planning from work that repeats at each location, such as delivery, installation and training. Assign a local contact and keep renewal dates in one equipment register.',
        },
        {
          heading: 'What should a maintenance quote specify?',
          body: 'Request the inspection scope, visit frequency, record format, replacement-supply charges and escalation process. Confirm whether post-use supplies, loaners, remote monitoring or technical repairs are included; none should be assumed from a plan name.',
        },
      ],
      fr: [
        {
          heading: 'Combien coûte un ensemble de DEA?',
          body: 'Le montant dépend de la configuration exacte, de la quantité et des services. Demandez une soumission détaillée séparant l’équipement et la mise en place des coûts récurrents ou de remplacement.',
        },
        {
          heading: 'Préparer un budget de planification sur cinq ans',
          body: 'Choisissez une période et additionnez les coûts proposés ci-dessous. Cinq ans est un exemple budgétaire, pas une durée de vie ou un intervalle de remplacement annoncé. Utilisez le calendrier réel du fabricant et vos besoins prévus.',
          bullets: [
            'Équipement initial : appareil, consommables compatibles, armoire ou étui, signalisation et trousse',
            'Mise en place : installation, exigences du lieu et remise',
            'Fournitures de remplacement : dates documentées et besoins après utilisation',
            'Formation : fournisseur, cours, groupe, déplacement et renouvellement',
            'Soutien continu : vérifications, registres et frais logiciels confirmés',
            'Livraison, taxes applicables et autres frais indiqués',
          ],
        },
        {
          heading: 'Comparer une même portée',
          body: 'Deux soumissions ne sont comparables que si le modèle, la version, les fournitures, les langues, les quantités et le soutien concordent. Distinguez les options des articles inclus et notez les exclusions. Demandez qui assure la garantie et quelles conditions de livraison ou de retour s’appliquent.',
        },
        {
          heading: 'Prévoir plusieurs sites',
          body: 'Dressez la liste des adresses, des quantités et des modèles existants. Séparez la planification commune des tâches répétées par emplacement, comme la livraison, l’installation et la formation. Désignez un contact local et regroupez les dates de renouvellement dans un registre.',
        },
        {
          heading: 'Que doit préciser une soumission d’entretien?',
          body: 'Demandez la portée des inspections, la fréquence des visites, le format des registres, les frais de remplacement et le traitement des problèmes. Confirmez si les fournitures après utilisation, les appareils de prêt, le suivi à distance ou les réparations sont inclus; le nom du plan ne suffit pas.',
        },
      ],
    },
    related: ['packages', 'parts', 'maintenance', 'quote'],
  },
];
