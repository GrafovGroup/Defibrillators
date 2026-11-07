import type { DetailPage } from './pages';

const technimount = {
  label: 'Technimount — Safety Arm System 500',
  url: 'https://www.technimount.com/en/products/safety-arm-system-500-stryker/',
};
const brochure = {
  label: 'Technimount — Safety Arm System 500, technical brochure (EN)',
  url: 'https://www.technimount.com/app/uploads/2025/11/BR-SAS-202508EN-01.pdf',
};
const manual = {
  label: 'Technimount — Safety Arm System 500, user guide (EN)',
  url: 'https://www.technimount.com/app/uploads/2025/11/UG-Safety-Arm-System-EN.pdf',
};

export const procurementPages: DetailPage[] = [
  {
    id: 'procurement',
    parent: 'industries',
    intro: {
      en: 'Plan AED purchases for public facilities and equipment enquiries for EMS fleets. Send your quantities, specifications and deadline for a written quote.',
      fr: 'Préparez vos achats de DEA pour les lieux publics et vos demandes d’équipement préhospitalier. Transmettez quantités, exigences et échéance pour une soumission écrite.',
    },
    sections: {
      en: [
        {
          heading: 'Start with the equipment and its setting',
          body: 'A community facility and an ambulance fleet have different purchasing needs. Tell us whether you are planning public-access AEDs, replacing compatible supplies or enquiring about stretcher-mounted equipment. For specialist equipment, supply options and service arrangements are confirmed in the written proposal.',
          bullets: [
            'Public buildings: AED models, language needs, cabinets, signage and site contacts.',
            'Existing equipment: exact models, part references, quantities and items being retained.',
            'EMS fleets: defibrillator and stretcher models, mounting configuration and technical documentation required.',
          ],
        },
        {
          heading: 'Send a clear procurement brief',
          body: 'Use the procurement option in our enquiry form. Include the tender or project reference, closing date, time zone and required delivery date. Attach the specification and pricing schedule, or share the public tender link. Identify mandatory requirements and the process for requesting an alternative.',
          bullets: [
            'Separate estimated annual demand from the first order quantity.',
            'List delivery destinations, receiving hours and the contact for each site.',
            'Include current addenda and identify any requirement that still needs clarification.',
          ],
        },
        {
          heading: 'Compare the complete written quotation',
          body: 'Ask for a line-by-line proposal with manufacturer references, quantities, unit prices in Canadian dollars and extended totals. Keep freight, taxes, installation and training visible so that the same scope can be compared across proposals.',
          bullets: [
            'Included components, optional items and exclusions.',
            'Confirmed availability, delivery schedule and quotation validity.',
            'Warranty coverage, service contact, return conditions and payment terms.',
            'Manufacturer documents supporting the proposed configuration and any required standards.',
          ],
        },
        {
          heading: 'Specify installation and technical training',
          body: 'For mounting systems, identify who will install the equipment and whether factory-authorized installation or repair training is required. Include participants, location and preferred language. The proposal must identify the provider, qualifications, scope and availability before booking. CPR and AED user training is a separate requirement.',
        },
        {
          heading: 'Plan repeat orders and delivery records',
          body: 'For several sites or staged deliveries, keep each destination and equipment configuration on its own order line. Specify purchase-order references, delivery notifications and any reporting format you need. Contract duration, renewal options and service levels belong in the agreed written terms.',
        },
      ],
      fr: [
        {
          heading: 'Préciser l’équipement et son contexte',
          body: 'Un établissement communautaire et un parc ambulancier ont des besoins d’achat différents. Indiquez si votre projet concerne des DEA en accès public, des fournitures compatibles ou des supports pour civières. Pour l’équipement spécialisé, les possibilités d’approvisionnement et les services sont confirmés dans la proposition écrite.',
          bullets: [
            'Bâtiments publics : modèles de DEA, langues, armoires, signalisation et contacts locaux.',
            'Équipement existant : modèles exacts, références, quantités et composants conservés.',
            'Parcs ambulanciers : modèles de défibrillateur et de civière, configuration du support et documentation technique requise.',
          ],
        },
        {
          heading: 'Transmettre un dossier d’achat précis',
          body: 'Choisissez l’option d’approvisionnement dans notre formulaire. Indiquez la référence du projet ou de l’appel d’offres, la date et l’heure de clôture, le fuseau horaire et la livraison souhaitée. Joignez le devis et le bordereau de prix, ou le lien public. Précisez les exigences obligatoires et la procédure d’approbation des solutions de remplacement.',
          bullets: [
            'Distinguez les besoins annuels estimés de la quantité de la première commande.',
            'Indiquez les destinations, les heures de réception et le contact de chaque lieu.',
            'Joignez les addendas à jour et signalez les exigences à clarifier.',
          ],
        },
        {
          heading: 'Comparer la soumission complète',
          body: 'Demandez une proposition détaillant les références du fabricant, les quantités, les prix unitaires en dollars canadiens et les totaux par article. Faites préciser le transport, les taxes, l’installation et la formation pour comparer des prestations équivalentes.',
          bullets: [
            'Composants inclus, options et exclusions.',
            'Disponibilité confirmée, calendrier de livraison et validité de la soumission.',
            'Garantie, contact de service, conditions de retour et modalités de paiement.',
            'Documents du fabricant à l’appui de la configuration et des normes demandées.',
          ],
        },
        {
          heading: 'Définir l’installation et la formation technique',
          body: 'Pour les supports, précisez qui réalisera l’installation et si une formation à l’installation ou à la réparation autorisée par le fabricant est exigée. Indiquez les participants, le lieu et la langue. La proposition doit confirmer le prestataire, ses qualifications, la portée et les disponibilités avant la réservation. La formation des utilisateurs en RCR et DEA constitue un besoin distinct.',
        },
        {
          heading: 'Prévoir les commandes et les registres de livraison',
          body: 'Pour plusieurs sites ou des livraisons échelonnées, conservez une ligne distincte par destination et configuration. Précisez les références des bons de commande, les avis de livraison et le format de rapport souhaité. La durée du contrat, les renouvellements et les niveaux de service sont définis dans les modalités écrites convenues.',
        },
      ],
    },
    related: ['mountCompatibility', 'municipalities', 'buying', 'programs'],
  },
  {
    id: 'mountCompatibility',
    parent: 'resources',
    kind: 'guide',
    intro: {
      en: 'Prepare a stretcher-mount enquiry with the exact defibrillator, stretcher and component references. Check fit, documentation and installation requirements.',
      fr: 'Préparez votre demande de support avec les références du défibrillateur, de la civière et des composants. Vérifiez l’ajustement et les exigences d’installation.',
    },
    guide: {
      reviewed: '2026-11-07',
      summary: {
        en: 'Identify the complete assembly before requesting a quote: stretcher, clamp, arm, base and device-specific bracket. A shared brand or similar appearance does not establish compatibility. Have the exact configuration confirmed against current manufacturer documentation.',
        fr: 'Identifiez l’ensemble avant de demander une soumission : civière, bloc de fixation, bras, base et support propre à l’appareil. Une marque commune ou une apparence semblable ne suffit pas à établir la compatibilité. Faites confirmer la configuration à l’aide des documents actuels du fabricant.',
      },
      sources: [technimount, brochure, manual],
      faqs: {
        en: [
          {
            heading: 'Does one mounting arm fit every defibrillator?',
            body: 'Do not assume a universal fit. Identify the device-specific bracket and its interface with the base and arm, then confirm the full assembly for the exact stretcher.',
          },
          {
            heading: 'Can I reuse a Power-PRO XT clamp on a Power-PRO 2?',
            body: 'The Technimount brochure lists different clamp-block references for these stretchers. Send the current part labels and exact stretcher model for confirmation before ordering or reusing components.',
          },
          {
            heading: 'What if the tender and manufacturer datasheet disagree?',
            body: 'Record the conflicting requirement, document revision and proposed configuration. Request written clarification through the buyer’s stated process before treating an alternative or deviation as approved.',
          },
          {
            heading: 'Is installation or repair training included?',
            body: 'Only when it is included in the written quotation. State whether factory-authorized training is required and confirm who will provide it, for which equipment and in which language.',
          },
        ],
        fr: [
          {
            heading: 'Un seul bras convient-il à tous les défibrillateurs?',
            body: 'Ne présumez pas un ajustement universel. Identifiez le support propre à l’appareil et son interface avec la base et le bras, puis faites confirmer l’ensemble pour la civière exacte.',
          },
          {
            heading:
              'Puis-je réutiliser un bloc Power-PRO XT sur une Power-PRO 2?',
            body: 'La brochure Technimount indique des références de blocs différentes pour ces civières. Transmettez les étiquettes des pièces et le modèle exact de civière pour confirmation avant tout achat ou réemploi.',
          },
          {
            heading:
              'Que faire si le devis et la fiche du fabricant divergent?',
            body: 'Consignez l’exigence concernée, la version du document et la configuration proposée. Demandez une clarification écrite selon la procédure de l’acheteur avant de considérer une solution de remplacement ou un écart comme approuvé.',
          },
          {
            heading:
              'L’installation ou la formation à la réparation est-elle incluse?',
            body: 'Seulement si la soumission écrite le prévoit. Précisez si une formation autorisée par le fabricant est requise et confirmez le prestataire, l’équipement visé et la langue.',
          },
        ],
      },
    },
    sections: {
      en: [
        {
          heading: 'Record both equipment labels',
          body: 'Copy the manufacturer and complete model from the stretcher and defibrillator labels. Include the model number, relevant version and existing accessory references. A device family name alone may leave the configuration unclear. Photographs should show equipment labels only, without patient information.',
          bullets: [
            'Stretcher make, model and model number.',
            'Defibrillator make, model and fitted bracket.',
            'Existing arm, base, clamp and adapter references.',
          ],
        },
        {
          heading: 'Identify every part of the assembly',
          body: 'Prepare an itemized component list and mark what you already have. For the Safety Arm System 500, Technimount describes a stretcher-mounted arm with a Standard Surface Base and a compatible Bracket Pro Serie device bracket. Confirm the required clamp, mounting side and any IV-pole adapter for the proposed assembly.',
        },
        {
          heading: 'Check model and mounting-side references',
          body: 'The manufacturer’s brochure distinguishes these clamp-block references: Power-PRO 2 right 570-10-PRO2 and left 570-10-PRO2-LFS; Power-PRO XT right 500-10-PFXT and left 500-10-PFXT-LFS. These are reference examples, not complete mounting kits. Confirm the orientation and current part revision before ordering.',
        },
        {
          heading: 'Compare the complete configuration with the specification',
          body: 'Ask for documentation covering the proposed assembly, not just an isolated component. Record the required load, total installed weight, upright height, movement clearance and other equipment that must remain accessible. Where a standard is required, ask which tested configuration and document support the claim. Resolve differences in measurement or scope in writing.',
        },
        {
          heading: 'Include installation and handover requirements',
          body: 'Follow the current manufacturer instructions and the appropriate qualified installation route. Ask the quotation to identify installation, technical training, inspection records, replacement parts and warranty support separately. This guide helps prepare a purchasing enquiry; installation and repair procedures belong in the equipment instructions and authorized training.',
        },
      ],
      fr: [
        {
          heading: 'Relever les deux étiquettes d’équipement',
          body: 'Recopiez le fabricant et le modèle complet sur les étiquettes de la civière et du défibrillateur. Ajoutez le numéro de modèle, la version pertinente et les références des accessoires. Le nom d’une gamme peut laisser la configuration incertaine. Les photos doivent montrer uniquement les étiquettes, sans renseignements sur les patients.',
          bullets: [
            'Marque, modèle et numéro de modèle de la civière.',
            'Marque, modèle du défibrillateur et support installé.',
            'Références du bras, de la base, du bloc et des adaptateurs existants.',
          ],
        },
        {
          heading: 'Identifier chaque composant',
          body: 'Dressez une liste détaillée et indiquez les pièces déjà présentes. Pour le Safety Arm System 500, Technimount décrit un bras fixé à la civière avec une Standard Surface Base et un support Bracket Pro Serie compatible. Confirmez le bloc, le côté de montage et l’éventuel adaptateur pour tige à perfusion.',
        },
        {
          heading: 'Vérifier le modèle et le côté de montage',
          body: 'La brochure du fabricant distingue ces blocs : Power-PRO 2 droit 570-10-PRO2 et gauche 570-10-PRO2-LFS; Power-PRO XT droit 500-10-PFXT et gauche 500-10-PFXT-LFS. Ces exemples de références ne constituent pas des ensembles complets. Confirmez l’orientation et la version actuelle avant de commander.',
        },
        {
          heading: 'Comparer la configuration complète au devis',
          body: 'Demandez des documents visant l’assemblage proposé, au-delà d’un composant isolé. Relevez la charge requise, le poids total installé, la hauteur en position verticale, les dégagements et l’accès aux autres équipements. Si une norme est exigée, demandez quelle configuration testée et quel document étayent cette conformité. Faites clarifier par écrit les écarts de mesure ou de portée.',
        },
        {
          heading: 'Prévoir l’installation et la remise de l’équipement',
          body: 'Suivez les instructions actuelles du fabricant et recourez au service d’installation qualifié approprié. Faites distinguer l’installation, la formation technique, les registres d’inspection, les pièces et le soutien sous garantie. Ce guide sert à préparer une demande d’achat; les procédures d’installation et de réparation relèvent des instructions et de la formation autorisée.',
        },
      ],
    },
    related: ['procurement', 'parts', 'accessories', 'buying'],
  },
];
