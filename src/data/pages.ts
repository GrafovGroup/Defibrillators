import { pageVisuals } from './visuals.ts';
import { offeringPages } from './offering-pages.ts';
import type { Locale } from './content';
import {
  accessoryIds,
  industryIds,
  serviceIds,
  type PageId,
} from './routes.ts';
import { planningPages } from './planning-pages.ts';
import { products } from './products.ts';
import { guideDetails } from './guide-details.ts';
import { locationPages } from './locations.ts';
export type Localized<T> = Record<Locale, T>;
export interface Section {
  heading: string;
  body: string;
  bullets?: string[];
}
export interface DetailPage {
  id: Exclude<PageId, 'home'>;
  parent?: PageId;
  kind?:
    | 'catalogue'
    | 'product'
    | 'comparison'
    | 'quote'
    | 'contact'
    | 'faq'
    | 'location'
    | 'parts'
    | 'packages'
    | 'guide';
  guide?: {
    reviewed: string;
    summary: Localized<string>;
    sources: { label: string; url: string }[];
    faqs: Localized<Section[]>;
  };
  location?: {
    code: string;
    mapId: string;
    reviewed: string;
    sources: { label: string; url: string }[];
    place: Localized<string>;
    checklist: Localized<string[]>;
    faqs: Localized<Section[]>;
  };
  image?: string;
  intro: Localized<string>;
  sections: Localized<Section[]>;
  children?: PageId[];
  related?: PageId[];
}
export const pageImages = {
  'aed-cabinet': {
    en: 'An AED in a wall-mounted cabinet with location signage',
    fr: 'Un DEA dans une armoire murale avec une enseigne de localisation',
  },
  readiness: {
    en: 'Two ZOLL AED Plus units in their carrying cases',
    fr: 'Deux ZOLL AED Plus dans leurs étuis de transport',
  },
  electrodes: {
    en: 'Packaged Philips defibrillator electrode pads',
    fr: 'Électrodes Philips pour défibrillateur dans leur emballage',
  },
  maintenance: {
    en: 'An open Powerheart AED G3 with electrodes inside the lid',
    fr: 'Un Powerheart AED G3 ouvert avec des électrodes à l’intérieur du couvercle',
  },
  'philips-reference': {
    en: 'A Philips HeartStart carrying case in a wall cabinet',
    fr: 'Un étui de transport Philips HeartStart dans une armoire murale',
  },
  training: {
    en: 'Training electrodes being placed on a CPR manikin',
    fr: 'Des électrodes de formation placées sur un mannequin de RCR',
  },
} as const;
const s = (heading: string, body: string, bullets?: string[]): Section => ({
  heading,
  body,
  ...(bullets ? { bullets } : {}),
});
export const pages: DetailPage[] = [
  {
    id: 'search',
    intro: {
      en: 'Find AED models, replacement parts, installation services and buying guides. Search by product, topic or Canadian city.',
      fr: 'Trouvez des modèles de DEA, des pièces, des services d’installation et des guides d’achat. Recherchez par produit, sujet ou ville canadienne.',
    },
    sections: { en: [], fr: [] },
  },
  ...locationPages,
  ...planningPages,
  ...offeringPages,
  ...products
    .filter((p) => !['zoll', 'philips'].includes(p.id))
    .map((p): DetailPage => ({
      id: p.id,
      parent: 'defibrillators',
      kind: 'product',
      intro: {
        en: `${p.manufacturer} ${p.model}: ${p.guidance.en}`,
        fr: `${p.manufacturer} ${p.model} : ${p.guidance.fr}`,
      },
      sections: {
        en: [
          s(
            'Prepare your quote request',
            'Tell us the quantity, delivery location and preferred prompt language. For a replacement or an existing fleet, include the device label and current supply references so your quote can identify the right configuration.',
          ),
        ],
        fr: [
          s(
            'Préparez votre demande de soumission',
            'Précisez la quantité, le lieu de livraison et la langue souhaitée. Pour un remplacement ou un parc existant, indiquez l’étiquette de l’appareil et les références des fournitures actuelles afin de préparer une soumission adaptée.',
          ),
        ],
      },
      related: ['compare', 'parts', 'packages', 'buying'],
    })),
  {
    id: 'defibrillators',
    kind: 'catalogue',
    image: 'readiness',
    intro: {
      en: 'Explore AED model information, compare the essentials and plan a purchase for your workplace, community space or home.',
      fr: 'Explorez les modèles de DEA, comparez leurs principales caractéristiques et préparez un achat pour votre travail, votre communauté ou votre résidence.',
    },
    sections: {
      en: [
        s(
          'Start with your setting',
          'An AED purchase includes more than the device. Consider access, language needs, suitable accessories, responsibility for checks and the people who will use it.',
        ),
        s(
          'Confirm before ordering',
          'These model profiles summarise manufacturer information. They are not confirmed inventory. Canadian device licensing, the exact configuration, supply availability, warranty and included items must be confirmed before a sale.',
        ),
      ],
      fr: [
        s(
          'Commencez par votre environnement',
          'L’achat ne se limite pas à l’appareil. Tenez compte de l’accès, des besoins linguistiques, des accessoires appropriés, des responsabilités de vérification et des utilisateurs.',
        ),
        s(
          'Confirmer avant de commander',
          'Ces fiches résument les renseignements des fabricants. Elles ne représentent pas un inventaire confirmé. L’homologation canadienne, la configuration exacte, la disponibilité, la garantie et les articles inclus doivent être confirmés avant une vente.',
        ),
      ],
    },
    related: ['compare', 'packages', 'parts', 'costs', 'quote'],
  },
  {
    id: 'zoll',
    parent: 'defibrillators',
    kind: 'product',
    image: 'readiness',
    intro: {
      en: 'A manufacturer reference profile for the ZOLL AED Plus, with considerations for equipment selection and ongoing supplies.',
      fr: 'Une fiche de référence du ZOLL AED Plus, avec des points à considérer pour le choix de l’équipement et des fournitures.',
    },
    sections: {
      en: [
        s(
          'Understand the configuration',
          'ZOLL describes visual and audible guidance. Real CPR Help provides compression-rate and depth feedback when used with CPR-D-padz; that feedback is intended for adults. Confirm the exact device version and its instructions.',
        ),
        s(
          'Plan replacement supplies',
          'Request a written list of compatible electrodes and approved batteries for the exact unit. Adult and paediatric supplies have different requirements; do not substitute supplies based on appearance.',
        ),
        s(
          'What your quote should confirm',
          'Ask for the device identifier, Canadian licence verification, prompt language, included supplies, service route and warranty terms. The photo is a licensed example, not the exact unit offered.',
        ),
      ],
      fr: [
        s(
          'Comprendre la configuration',
          'ZOLL décrit un guidage visuel et sonore. Real CPR Help fournit une rétroaction sur la fréquence et la profondeur des compressions avec les CPR-D-padz; cette fonction est destinée aux adultes. Confirmez la version exacte et ses instructions.',
        ),
        s(
          'Prévoir les fournitures de remplacement',
          'Demandez une liste écrite des électrodes compatibles et des batteries approuvées pour l’appareil exact. Les fournitures pour adultes et enfants répondent à des exigences différentes; ne les remplacez pas selon leur apparence.',
        ),
        s(
          'Ce que la soumission doit confirmer',
          'Demandez l’identifiant de l’appareil, la vérification de l’homologation canadienne, la langue des messages, les fournitures incluses, le service technique et les modalités de garantie. La photo est un exemple sous licence, pas l’appareil précis proposé.',
        ),
      ],
    },
    related: ['compare', 'pads', 'batteries', 'quote'],
  },
  {
    id: 'philips',
    parent: 'defibrillators',
    kind: 'product',
    image: 'philips-reference',
    intro: {
      en: 'A manufacturer reference profile for the Philips HeartStart HS1, also described as OnSite in manufacturer materials.',
      fr: 'Une fiche de référence du Philips HeartStart HS1, aussi désigné OnSite dans la documentation du fabricant.',
    },
    sections: {
      en: [
        s(
          'Guidance and supplies',
          'Philips describes step-by-step voice guidance, a CPR metronome and SMART Pads cartridges. Adult and infant/child cartridges are separate supplies. Review the instructions for the exact Canadian configuration.',
        ),
        s(
          'Make compatibility part of the request',
          'Provide the device label and existing cartridge or battery part number when requesting replacements. Training cartridges are not treatment supplies and must be kept separate from rescue equipment.',
        ),
        s(
          'Before a purchase',
          'Confirm Canadian licensing, the prompt language, included items, supply availability and warranty in writing. Manufacturer reference information does not establish our dealership status or current inventory.',
        ),
      ],
      fr: [
        s(
          'Guidage et fournitures',
          'Philips décrit un guidage vocal par étapes, un métronome pour la RCR et des cartouches SMART Pads. Les cartouches pour adultes et pour nourrissons ou enfants sont distinctes. Consultez les instructions de la configuration canadienne exacte.',
        ),
        s(
          'Inclure la compatibilité dans la demande',
          'Fournissez l’étiquette de l’appareil et le numéro de pièce de la cartouche ou de la batterie actuelle. Les cartouches de formation ne sont pas des fournitures de traitement et doivent être séparées de l’équipement de secours.',
        ),
        s(
          'Avant un achat',
          'Confirmez par écrit l’homologation canadienne, la langue des messages, les articles inclus, la disponibilité et la garantie. Les renseignements du fabricant ne prouvent ni un statut de distributeur autorisé ni un inventaire actuel.',
        ),
      ],
    },
    related: ['compare', 'pads', 'batteries', 'quote'],
  },
  {
    id: 'compare',
    parent: 'defibrillators',
    kind: 'comparison',
    intro: {
      en: 'Compare manufacturer-described features side by side, then confirm the exact configuration and your site requirements before choosing.',
      fr: 'Comparez les caractéristiques décrites par les fabricants, puis confirmez la configuration exacte et les besoins de votre emplacement avant de choisir.',
    },
    sections: {
      en: [
        s(
          'A comparison, not a recommendation',
          'Neither model is ranked as better or guaranteed suitable for a particular person or setting. Language configuration, supplies, environmental limits, training and ongoing care can matter as much as individual features.',
        ),
        s(
          'Keep procurement evidence together',
          'Keep the supplier quote, device licence verification, manufacturer instructions and compatible-supply list together. Ask for an explanation of any difference between a reference profile and the offered configuration.',
        ),
      ],
      fr: [
        s(
          'Une comparaison, pas une recommandation',
          'Aucun modèle n’est présenté comme supérieur ou garanti approprié pour une personne ou un lieu. La langue, les fournitures, les limites environnementales, la formation et l’entretien comptent autant que les caractéristiques.',
        ),
        s(
          'Conserver les documents d’achat',
          'Regroupez la soumission, la vérification de l’homologation, les instructions du fabricant et la liste des fournitures compatibles. Demandez une explication de toute différence entre la fiche de référence et la configuration proposée.',
        ),
      ],
    },
    related: ['buying', 'quote'],
  },
  {
    id: 'accessories',
    image: 'electrodes',
    children: ['parts', ...accessoryIds],
    intro: {
      en: 'Build out your AED setup with compatible supplies, suitable storage and clear location signage.',
      fr: 'Complétez votre installation avec des fournitures compatibles, un rangement approprié et une signalisation claire.',
    },
    sections: {
      en: [
        s(
          'Match supplies to the exact AED',
          'A matching brand alone is not enough. Send the make, model and part number from your current supply or device label so compatibility can be checked.',
        ),
        s(
          'Plan for replacement',
          'Record expiry dates when supplies arrive. Allow time to confirm replacements, and follow the manufacturer’s instructions after a device is used or a fault is reported.',
        ),
      ],
      fr: [
        s(
          'Associer les fournitures au DEA exact',
          'La marque ne suffit pas. Envoyez la marque, le modèle et le numéro de pièce figurant sur la fourniture actuelle ou l’étiquette de l’appareil pour vérifier la compatibilité.',
        ),
        s(
          'Prévoir le remplacement',
          'Notez les dates d’expiration à la réception. Prévoyez le temps de confirmer les remplacements et suivez les instructions du fabricant après une utilisation ou un signalement de défaillance.',
        ),
      ],
    },
    related: ['care', 'maintenance', 'quote'],
  },
  {
    id: 'pads',
    parent: 'accessories',
    image: 'electrodes',
    intro: {
      en: 'Request replacement electrode pads matched to your AED model, patient category and manufacturer instructions.',
      fr: 'Demandez des électrodes de remplacement adaptées au modèle du DEA, à la catégorie de patient et aux instructions du fabricant.',
    },
    sections: {
      en: [
        s(
          'Information to include',
          'A clear equipment description helps avoid ordering the wrong connector or cartridge.',
          [
            'AED make and exact model',
            'Current pad or cartridge part number',
            'Adult or paediatric supply requirement',
            'Quantity, location and expiry date',
          ],
        ),
        s(
          'Check the package',
          'Keep treatment pads sealed and stored as directed. Check the packaging and use-by date during scheduled readiness checks. Follow manufacturer instructions for replacement after use or if packaging is damaged.',
        ),
        s(
          'Separate training from rescue',
          'Training electrodes and demonstration supplies are not substitutes for clinical pads. Label and store training materials separately.',
        ),
      ],
      fr: [
        s(
          'Renseignements à fournir',
          'Une description précise aide à éviter un mauvais connecteur ou une mauvaise cartouche.',
          [
            'Marque et modèle exact du DEA',
            'Numéro de pièce des électrodes ou de la cartouche',
            'Besoin pour adultes ou enfants',
            'Quantité, emplacement et date d’expiration',
          ],
        ),
        s(
          'Vérifier l’emballage',
          'Gardez les électrodes de traitement scellées et entreposées selon les instructions. Vérifiez l’emballage et la date limite lors des contrôles périodiques. Suivez les consignes de remplacement après utilisation ou si l’emballage est endommagé.',
        ),
        s(
          'Séparer formation et intervention',
          'Les électrodes de formation et les fournitures de démonstration ne remplacent pas les électrodes cliniques. Identifiez et rangez les articles de formation séparément.',
        ),
      ],
    },
    related: ['batteries', 'care', 'quote'],
  },
  {
    id: 'batteries',
    parent: 'accessories',
    image: 'maintenance',
    intro: {
      en: 'Plan battery replacement around the requirements of your exact AED, rather than a generic replacement schedule.',
      fr: 'Planifiez le remplacement des batteries selon les exigences de votre DEA exact, plutôt que selon un calendrier général.',
    },
    sections: {
      en: [
        s(
          'Confirm the specified battery',
          'Some AEDs use a proprietary battery pack; others specify particular cells. Send the device model and current battery information. Do not assume a physically similar battery is approved for the device.',
        ),
        s(
          'Distinguish the dates',
          'Shelf life, installed standby life and replacement indicators are different. Record the installation date and follow the applicable manufacturer instructions instead of treating a single advertised lifespan as a guarantee.',
        ),
        s(
          'After replacement',
          'Follow the manufacturer’s installation and self-test procedure, document the work and confirm the status indication. Ask about local battery-disposal requirements.',
        ),
      ],
      fr: [
        s(
          'Confirmer la batterie prescrite',
          'Certains DEA utilisent un bloc-batterie propre au fabricant; d’autres exigent des piles précises. Fournissez le modèle et les renseignements sur la batterie actuelle. Une batterie de forme semblable n’est pas nécessairement approuvée pour l’appareil.',
        ),
        s(
          'Distinguer les dates',
          'La durée d’entreposage, la durée en veille après installation et les indicateurs de remplacement sont différents. Notez la date d’installation et suivez les instructions applicables, sans considérer une durée annoncée comme une garantie.',
        ),
        s(
          'Après le remplacement',
          'Suivez la procédure d’installation et d’autotest du fabricant, consignez l’intervention et confirmez l’indicateur d’état. Informez-vous sur les exigences locales d’élimination des batteries.',
        ),
      ],
    },
    related: ['pads', 'maintenance', 'quote'],
  },
  {
    id: 'cabinets',
    parent: 'accessories',
    image: 'aed-cabinet',
    intro: {
      en: 'Choose an AED cabinet that fits the equipment and the location, while keeping access straightforward.',
      fr: 'Choisissez une armoire adaptée à l’équipement et à l’emplacement, tout en facilitant l’accès.',
    },
    sections: {
      en: [
        s(
          'Measure the complete setup',
          'Allow room for the AED in its case and any supplies stored alongside it. Confirm internal dimensions, door clearance, wall construction and mounting arrangements before ordering.',
        ),
        s(
          'Consider the environment',
          'Indoor, outdoor and temperature-controlled installations have different requirements. A cabinet alone does not make an indoor AED suitable for exposure to Canadian winter conditions.',
        ),
        s(
          'Access and alerts',
          'Discuss visibility, reachable placement and whether an alarm is appropriate. Confirm how people can retrieve the AED during all intended access hours. Any electrical work or alarm integration needs an appropriate scope and provider.',
        ),
      ],
      fr: [
        s(
          'Mesurer l’ensemble de l’installation',
          'Prévoyez de l’espace pour le DEA dans son étui et les fournitures connexes. Confirmez les dimensions intérieures, le dégagement de la porte, le type de mur et la fixation avant de commander.',
        ),
        s(
          'Tenir compte du milieu',
          'Les installations intérieures, extérieures et à température contrôlée ont des exigences différentes. Une armoire ne rend pas à elle seule un DEA intérieur adapté à l’hiver canadien.',
        ),
        s(
          'Accès et alertes',
          'Discutez de la visibilité, de la hauteur accessible et de la pertinence d’une alarme. Confirmez la façon d’accéder au DEA pendant les heures prévues. Les travaux électriques et l’intégration d’alarmes nécessitent un mandat et un intervenant appropriés.',
        ),
      ],
    },
    related: ['installation', 'signage', 'quote'],
  },
  {
    id: 'signage',
    parent: 'accessories',
    image: 'aed-cabinet',
    intro: {
      en: 'Help people locate the AED with clear identification and directional signs suited to your building.',
      fr: 'Aidez les gens à repérer le DEA avec une identification claire et des panneaux directionnels adaptés au bâtiment.',
    },
    sections: {
      en: [
        s(
          'Identify the route, not only the cabinet',
          'Look at entrances, corridors, changes of direction and shared areas. A sign above the device may not be visible from where someone first needs to locate it.',
        ),
        s(
          'Plan language and visibility',
          'Consider the people using the space, viewing distance, lighting, obstructions and French/English needs. Confirm any facility or jurisdiction-specific requirements rather than assuming one sign meets every rule.',
        ),
        s(
          'Keep the information current',
          'Update maps, staff orientation and directional signs whenever an AED moves. Check for obscured or damaged signs during routine site reviews.',
        ),
      ],
      fr: [
        s(
          'Indiquer le parcours, pas seulement l’armoire',
          'Examinez les entrées, les corridors, les changements de direction et les espaces partagés. Une enseigne au-dessus du DEA peut être invisible depuis le point de départ d’une personne.',
        ),
        s(
          'Prévoir la langue et la visibilité',
          'Tenez compte des utilisateurs, de la distance de lecture, de l’éclairage, des obstacles et des besoins en français et en anglais. Confirmez les exigences propres au lieu ou au territoire plutôt que de présumer qu’un panneau convient partout.',
        ),
        s(
          'Garder les renseignements à jour',
          'Mettez à jour les plans, l’orientation du personnel et les panneaux lorsqu’un DEA change d’emplacement. Vérifiez les panneaux cachés ou endommagés lors des inspections du lieu.',
        ),
      ],
    },
    related: ['cabinets', 'installation', 'quote'],
  },
  {
    id: 'kits',
    parent: 'accessories',
    image: 'training',
    intro: {
      en: 'Discuss supporting supplies for your AED station and emergency plan, with contents confirmed in the quote.',
      fr: 'Discutez des fournitures d’accompagnement pour votre poste de DEA et votre plan d’urgence; le contenu sera confirmé dans la soumission.',
    },
    sections: {
      en: [
        s(
          'Define the contents',
          'Possible items to discuss include gloves, a CPR barrier, scissors and a towel. Contents depend on the site plan, manufacturer guidance and training. No standard kit contents are promised on this page.',
        ),
        s(
          'Keep the station organised',
          'Store supporting supplies where they can be found with the AED, without blocking access or hiding the status indicator. Check seals, quantities and any applicable expiry dates.',
        ),
        s(
          'Restock after use',
          'Include consumables in the post-use replenishment plan. Identify who documents supplies used and who arranges replacement before the station returns to its planned condition.',
        ),
      ],
      fr: [
        s(
          'Définir le contenu',
          'Les articles à discuter peuvent comprendre des gants, une barrière de RCR, des ciseaux et une serviette. Le contenu dépend du plan du lieu, des consignes du fabricant et de la formation. Aucun contenu standard n’est promis ici.',
        ),
        s(
          'Organiser le poste',
          'Rangez les fournitures près du DEA, sans bloquer l’accès ni masquer son témoin d’état. Vérifiez les scellés, les quantités et les dates d’expiration applicables.',
        ),
        s(
          'Réapprovisionner après utilisation',
          'Intégrez les consommables au plan de réapprovisionnement. Désignez la personne qui consigne les articles utilisés et celle qui organise leur remplacement avant de rétablir le poste.',
        ),
      ],
    },
    related: ['training', 'care', 'quote'],
  },
  {
    id: 'services',
    image: 'training',
    children: serviceIds,
    intro: {
      en: 'Connect your AED purchase with installation planning, ongoing checks and training coordination.',
      fr: 'Reliez votre achat de DEA à la planification de l’installation, aux vérifications et à la coordination de formations.',
    },
    sections: {
      en: [
        s(
          'Agree on a clear scope',
          'Start with the location, equipment, access arrangements and responsibilities. Service availability and any qualified partner involvement are confirmed for your site before booking.',
        ),
        s(
          'Keep responsibilities visible',
          'A program needs someone to organise checks, respond to reported issues and arrange replacements. We help you describe that work so it can be included in a practical service request.',
        ),
      ],
      fr: [
        s(
          'Définir un mandat clair',
          'Commencez par l’emplacement, l’équipement, l’accès et les responsabilités. La disponibilité des services et la participation éventuelle de partenaires qualifiés sont confirmées avant la réservation.',
        ),
        s(
          'Clarifier les responsabilités',
          'Un programme nécessite une personne pour organiser les vérifications, traiter les problèmes signalés et prévoir les remplacements. Nous vous aidons à décrire ces tâches dans une demande de service concrète.',
        ),
      ],
    },
    related: ['quote', 'contact'],
  },
  {
    id: 'installation',
    parent: 'services',
    image: 'aed-cabinet',
    intro: {
      en: 'Plan an AED installation around visibility, access and the way people use your space.',
      fr: 'Planifiez l’installation d’un DEA selon sa visibilité, son accessibilité et l’utilisation de vos espaces.',
    },
    sections: {
      en: [
        s(
          'Review the site',
          'Share the floor plan or a description of the proposed location, wall construction, access hours and any environmental exposure. Discuss the people who need to reach the AED, including visitors and people with disabilities.',
        ),
        s(
          'Define installation work',
          'Confirm cabinet fit, mounting, signage and any building approvals. Electrical work, alarm connections and outdoor temperature control require separate consideration and an appropriately qualified provider.',
        ),
        s(
          'Complete the handover',
          'Record the installed location, device details, supply dates and responsible contact. Include manufacturer-guided setup, orientation and a plan for ongoing checks in the agreed scope.',
        ),
      ],
      fr: [
        s(
          'Examiner le lieu',
          'Présentez un plan ou une description de l’emplacement proposé, du mur, des heures d’accès et de l’exposition aux éléments. Discutez des personnes qui doivent pouvoir atteindre le DEA, notamment les visiteurs et les personnes handicapées.',
        ),
        s(
          'Définir les travaux',
          'Confirmez les dimensions de l’armoire, la fixation, la signalisation et les autorisations du bâtiment. Les travaux électriques, les alarmes et le contrôle de température extérieur demandent une évaluation distincte et un intervenant qualifié.',
        ),
        s(
          'Préparer la remise de l’installation',
          'Consignez l’emplacement, l’appareil, les dates des fournitures et le contact responsable. Incluez au mandat la mise en place selon le fabricant, l’orientation et un plan de vérification.',
        ),
      ],
    },
    related: ['cabinets', 'signage', 'maintenance', 'quote'],
  },
  {
    id: 'maintenance',
    parent: 'services',
    image: 'maintenance',
    intro: {
      en: 'Organise documented readiness inspections and replacement planning for your AED equipment.',
      fr: 'Organisez des vérifications documentées et la planification des remplacements pour vos DEA.',
    },
    sections: {
      en: [
        s(
          'Readiness checks',
          'An agreed inspection can cover the visible status indicator, supplies, expiry dates, physical condition, access and signage. Frequency and procedures should follow the manufacturer’s instructions and your site requirements.',
        ),
        s(
          'Act on findings',
          'Record the date, checker, findings and follow-up owner. A fault, damaged supply or unsuccessful self-test needs prompt escalation under the manufacturer’s instructions; a completed checklist is not a guarantee of future performance.',
        ),
        s(
          'Technical service is different',
          'Readiness inspections do not replace manufacturer-specific repairs, calibration or authorized servicing. Technical issues must be referred to the appropriate qualified or authorized channel. No remote monitoring service is implied.',
        ),
      ],
      fr: [
        s(
          'Vérifications de disponibilité',
          'Une inspection convenue peut porter sur le témoin d’état, les fournitures, les dates d’expiration, l’état physique, l’accès et la signalisation. La fréquence et les procédures doivent suivre les instructions du fabricant et les exigences du lieu.',
        ),
        s(
          'Donner suite aux constats',
          'Consignez la date, la personne responsable, les constats et le suivi. Une défaillance, une fourniture endommagée ou un autotest non réussi nécessite un suivi rapide selon le fabricant; une liste remplie ne garantit pas le fonctionnement futur.',
        ),
        s(
          'Distinguer le service technique',
          'Les vérifications ne remplacent pas les réparations propres au fabricant, l’étalonnage ou l’entretien autorisé. Les problèmes techniques doivent être dirigés vers un intervenant qualifié ou autorisé. Aucun service de surveillance à distance n’est implicite.',
        ),
      ],
    },
    related: ['care', 'pads', 'batteries', 'quote'],
  },
  {
    id: 'programs',
    parent: 'services',
    image: 'readiness',
    intro: {
      en: 'Bring multiple AED locations into a consistent plan for equipment, responsibilities and replacement supplies.',
      fr: 'Intégrez plusieurs emplacements de DEA dans un plan cohérent d’équipement, de responsabilités et de remplacement des fournitures.',
    },
    sections: {
      en: [
        s(
          'Build a useful inventory',
          'Record each location, make, model, serial number, supply expiry dates, prompt language and local contact. Identify differing equipment and access needs before choosing a standard setup.',
        ),
        s(
          'Assign local and central roles',
          'Define who performs checks, who reviews reports and who approves replacements. Keep a process for absences, staff changes and equipment moves so tasks do not depend on one person’s memory.',
        ),
        s(
          'Plan a staged rollout',
          'Group installations and training enquiries around access windows and site readiness. Agree reporting and review arrangements in writing. This service enquiry does not promise a live monitoring platform or automated renewal reminders.',
        ),
      ],
      fr: [
        s(
          'Créer un inventaire utile',
          'Notez chaque emplacement, la marque, le modèle, le numéro de série, les dates d’expiration, la langue des messages et le contact local. Relevez les différences d’équipement et d’accès avant de standardiser.',
        ),
        s(
          'Répartir les rôles locaux et centraux',
          'Définissez qui effectue les vérifications, examine les rapports et autorise les remplacements. Prévoyez les absences, les changements de personnel et les déplacements d’appareils.',
        ),
        s(
          'Planifier un déploiement progressif',
          'Regroupez les installations et les demandes de formation selon les périodes d’accès et la préparation des lieux. Convenez par écrit des rapports et des révisions. Cette demande ne promet ni plateforme de surveillance en direct ni rappels automatiques de renouvellement.',
        ),
      ],
    },
    related: ['industries', 'installation', 'maintenance', 'quote'],
  },
  {
    id: 'training',
    parent: 'services',
    image: 'training',
    intro: {
      en: 'Coordinate CPR and AED training enquiries through qualified partners, matched to your team and location.',
      fr: 'Coordonnez vos demandes de formation en RCR et DEA avec des partenaires qualifiés, selon votre équipe et votre emplacement.',
    },
    sections: {
      en: [
        s(
          'Describe the learners',
          'Tell us the number of participants, language, location, scheduling needs and whether a particular course or certification is required. Include accessibility needs and whether children may be part of the response setting.',
        ),
        s(
          'Confirm the provider and course',
          'Before booking, confirm the training organisation, instructor credentials, curriculum, certification (if applicable), prerequisites and renewal requirements. We do not claim in-house certification or a partnership with a named organisation.',
        ),
        s(
          'Connect training to the workplace',
          'Help participants locate the actual AED and understand local emergency procedures. Keep training devices and pads separate from rescue equipment, and plan orientation when equipment or staff changes.',
        ),
      ],
      fr: [
        s(
          'Décrire les participants',
          'Indiquez le nombre de personnes, la langue, le lieu, l’horaire et tout cours ou certificat requis. Précisez les besoins d’accessibilité et la présence possible d’enfants dans le milieu d’intervention.',
        ),
        s(
          'Confirmer le fournisseur et le cours',
          'Avant de réserver, confirmez l’organisme, les qualifications de l’instructeur, le contenu, la certification s’il y a lieu, les préalables et le renouvellement. Nous ne revendiquons ni certification interne ni partenariat avec un organisme nommé.',
        ),
        s(
          'Relier la formation au lieu',
          'Aidez les participants à repérer le DEA réel et à comprendre les procédures locales. Séparez l’équipement de formation du matériel de secours et prévoyez une orientation lors de changements d’appareils ou de personnel.',
        ),
      ],
    },
    related: ['programs', 'kits', 'quote'],
  },
  {
    id: 'industries',
    image: 'aed-cabinet',
    children: industryIds,
    intro: {
      en: 'Different settings call for different access, equipment and coordination decisions. Start with the way your site operates.',
      fr: 'Chaque milieu présente des besoins d’accès, d’équipement et de coordination différents. Commencez par le fonctionnement de votre lieu.',
    },
    sections: {
      en: [
        s(
          'Scope each location',
          'Consider occupancy, public access, hours, environmental conditions and local responsibilities. Requirements vary by jurisdiction and facility; this site does not state that every workplace must have an AED.',
        ),
      ],
      fr: [
        s(
          'Évaluer chaque emplacement',
          'Tenez compte de l’occupation, de l’accès public, des horaires, du milieu et des responsabilités locales. Les exigences varient selon le territoire et l’établissement; ce site n’affirme pas que tous les milieux de travail doivent avoir un DEA.',
        ),
      ],
    },
    related: ['programs', 'buying', 'quote'],
  },
  {
    id: 'offices',
    parent: 'industries',
    image: 'aed-cabinet',
    intro: {
      en: 'Plan AED access for employees, visitors and shared workplace spaces, including outside normal reception hours.',
      fr: 'Planifiez l’accès au DEA pour les employés, les visiteurs et les espaces partagés, y compris hors des heures de réception.',
    },
    sections: {
      en: [
        s(
          'Look beyond the reception desk',
          'Consider multiple floors, secured doors, meeting spaces and flexible work schedules. An AED behind a locked reception area may be inaccessible to the people you intend it to serve.',
        ),
        s(
          'Coordinate with the building',
          'Clarify whether equipment is tenant-owned or shared with the building. Agree who checks the device, updates directions and handles supply replacement when a tenant or office manager changes.',
        ),
        s(
          'Prepare your enquiry',
          'Include floor count, occupied hours, visitor access, proposed locations and any existing emergency plan. Ask about suitable equipment, installation and team training together.',
        ),
      ],
      fr: [
        s(
          'Regarder au-delà de la réception',
          'Considérez les étages, les portes sécurisées, les salles de réunion et les horaires variables. Un DEA dans une réception verrouillée peut être inaccessible aux personnes visées.',
        ),
        s(
          'Se coordonner avec l’immeuble',
          'Précisez si l’équipement appartient au locataire ou est partagé. Convenez des vérifications, de la signalisation et du remplacement des fournitures lors d’un changement de locataire ou de responsable.',
        ),
        s(
          'Préparer votre demande',
          'Indiquez le nombre d’étages, les heures d’occupation, l’accès des visiteurs, les emplacements et le plan d’urgence existant. Discutez ensemble de l’équipement, de l’installation et de la formation.',
        ),
      ],
    },
    related: ['installation', 'training', 'programs'],
  },
  {
    id: 'industrial',
    parent: 'industries',
    image: 'readiness',
    intro: {
      en: 'Account for shifts, restricted areas and environmental conditions when planning AED equipment for industrial sites.',
      fr: 'Tenez compte des quarts de travail, des zones contrôlées et du milieu lors de la planification de DEA pour un site industriel.',
    },
    sections: {
      en: [
        s(
          'Describe the operating conditions',
          'Share temperature ranges, dust or moisture exposure, noise levels and storage arrangements. Check the exact device and cabinet limits rather than assuming all AEDs are suitable for the same conditions.',
        ),
        s(
          'Map practical access',
          'Look at warehouses, production areas, yards and security boundaries. Consider how a person on each shift would locate and retrieve equipment while following site safety procedures.',
        ),
        s(
          'Assign responsibility across shifts',
          'Name a local contact and backup, make reported issues visible between shifts and include supplies in the site inspection process. Send site count and access constraints with your enquiry.',
        ),
      ],
      fr: [
        s(
          'Décrire les conditions',
          'Précisez les températures, la poussière, l’humidité, le bruit et le rangement. Vérifiez les limites de l’appareil et de l’armoire exacts plutôt que de présumer que tous les DEA conviennent aux mêmes conditions.',
        ),
        s(
          'Planifier un accès concret',
          'Examinez les entrepôts, les aires de production, les cours et les limites de sécurité. Considérez comment chaque quart peut trouver et récupérer l’équipement en respectant les procédures du site.',
        ),
        s(
          'Répartir les responsabilités',
          'Nommez un contact et un remplaçant, transmettez les problèmes entre quarts et intégrez les fournitures aux inspections. Indiquez le nombre de sites et les contraintes d’accès dans votre demande.',
        ),
      ],
    },
    related: ['cabinets', 'maintenance', 'programs'],
  },
  {
    id: 'properties',
    parent: 'industries',
    image: 'aed-cabinet',
    intro: {
      en: 'Plan shared AED equipment for condominiums, residential buildings and managed properties with clear ownership and access arrangements.',
      fr: 'Planifiez des DEA partagés pour les copropriétés, les immeubles résidentiels et les propriétés gérées, avec des responsabilités et un accès clairs.',
    },
    sections: {
      en: [
        s(
          'Identify who can access the device',
          'Consider lobbies, amenity rooms, parking levels and access-control doors. Define intended access hours and how residents, visitors and staff will find the AED.',
        ),
        s(
          'Agree responsibilities with management',
          'Clarify purchasing approval, ownership, checks, supply budgets and handover when management changes. Record the equipment location in the property’s emergency information.',
        ),
        s(
          'Plan around the property portfolio',
          'For several buildings, gather an inventory before standardising. Installation conditions and local contacts may differ even when the properties share one management company.',
        ),
      ],
      fr: [
        s(
          'Définir les personnes ayant accès',
          'Considérez les halls, les salles communes, les stationnements et les portes contrôlées. Définissez les heures d’accès et la façon dont résidents, visiteurs et employés trouveront le DEA.',
        ),
        s(
          'Convenir des responsabilités',
          'Précisez l’autorisation d’achat, la propriété, les vérifications, le budget des fournitures et la relève lors d’un changement de gestionnaire. Inscrivez l’emplacement dans l’information d’urgence.',
        ),
        s(
          'Planifier pour plusieurs immeubles',
          'Établissez un inventaire avant de standardiser. Les conditions d’installation et les contacts locaux peuvent différer même sous une seule société de gestion.',
        ),
      ],
    },
    related: ['programs', 'installation', 'signage'],
  },
  {
    id: 'schools',
    parent: 'industries',
    image: 'training',
    intro: {
      en: 'Bring classrooms, sports facilities, visitors and after-hours activities into one AED planning conversation.',
      fr: 'Intégrez les classes, les installations sportives, les visiteurs et les activités hors des heures de cours dans la planification des DEA.',
    },
    sections: {
      en: [
        s(
          'Consider the people on campus',
          'Discuss age groups and manufacturer-specific paediatric requirements with the supplier and training provider. Confirm compatible supplies rather than assuming every device uses the same child mode or pads.',
        ),
        s(
          'Plan for the whole schedule',
          'Review access during school hours, evening rentals, sports events and holidays. A locked office may not serve an event taking place elsewhere on campus.',
        ),
        s(
          'Make handovers routine',
          'Name staff responsible for equipment, expiry tracking and holiday checks. Include equipment orientation in relevant staff changes, and confirm any school-board or local requirements.',
        ),
      ],
      fr: [
        s(
          'Considérer les personnes présentes',
          'Discutez des groupes d’âge et des exigences pédiatriques du fabricant avec le fournisseur et le formateur. Confirmez les fournitures compatibles sans présumer que tous les appareils utilisent le même mode enfant ou les mêmes électrodes.',
        ),
        s(
          'Prévoir tous les horaires',
          'Examinez l’accès pendant les cours, les locations en soirée, les événements sportifs et les vacances. Un bureau verrouillé peut être inutile à une activité ailleurs sur le campus.',
        ),
        s(
          'Organiser la relève',
          'Désignez les responsables de l’équipement, des dates d’expiration et des vérifications pendant les congés. Prévoyez une orientation lors des changements de personnel et confirmez les exigences scolaires ou locales.',
        ),
      ],
    },
    related: ['pads', 'training', 'programs'],
  },
  {
    id: 'fitness',
    parent: 'industries',
    image: 'training',
    intro: {
      en: 'Plan AED access around workout areas, recreation spaces and the hours your facility is actually used.',
      fr: 'Planifiez l’accès au DEA selon les zones d’entraînement, les espaces récréatifs et les heures réelles d’utilisation.',
    },
    sections: {
      en: [
        s(
          'Review the facility layout',
          'Consider reception, studios, courts, change areas and pools. Moisture and temperature conditions must be assessed against the manufacturer’s instructions for the equipment and storage.',
        ),
        s(
          'Include unstaffed hours',
          'If members access the facility when staff are absent, review how the AED can be located and retrieved. Do not assume a front-desk cabinet provides access at all times.',
        ),
        s(
          'Coordinate staff and event plans',
          'Connect equipment orientation with local emergency procedures. Include temporary events, changes of staff and replenishment after use in the program scope.',
        ),
      ],
      fr: [
        s(
          'Examiner l’aménagement',
          'Considérez la réception, les studios, les terrains, les vestiaires et les piscines. Évaluez l’humidité et la température selon les instructions du fabricant pour l’équipement et le rangement.',
        ),
        s(
          'Inclure les heures sans personnel',
          'Si les membres accèdent au centre sans personnel, examinez comment repérer et récupérer le DEA. Une armoire à la réception n’assure pas forcément un accès permanent.',
        ),
        s(
          'Coordonner équipes et événements',
          'Reliez l’orientation sur l’équipement aux procédures locales. Incluez les événements temporaires, les changements de personnel et le réapprovisionnement après utilisation.',
        ),
      ],
    },
    related: ['installation', 'training', 'maintenance'],
  },
  {
    id: 'hospitality',
    parent: 'industries',
    image: 'aed-cabinet',
    intro: {
      en: 'Support AED planning across guest areas, meeting rooms and back-of-house operations.',
      fr: 'Planifiez les DEA pour les espaces clients, les salles de réunion et les zones de travail internes.',
    },
    sections: {
      en: [
        s(
          'Consider guests and teams',
          'Hotels and venues serve people unfamiliar with the building. Review visible signs, public-facing locations and the languages needed for equipment and staff orientation.',
        ),
        s(
          'Plan for changing occupancy',
          'Include banquet spaces, seasonal areas and overnight access. Responsibility should remain clear as event teams, shifts and facility layouts change.',
        ),
        s(
          'Coordinate several properties',
          'For a hotel group or venue portfolio, request a location-by-location inventory and scope. Confirm service arrangements at each property rather than assuming identical access or installation conditions.',
        ),
      ],
      fr: [
        s(
          'Considérer clients et équipes',
          'Les hôtels et les salles accueillent des personnes qui connaissent peu le bâtiment. Examinez la signalisation, les emplacements publics et les langues nécessaires pour l’équipement et l’orientation.',
        ),
        s(
          'Prévoir les variations d’occupation',
          'Incluez les salles de réception, les zones saisonnières et l’accès de nuit. Les responsabilités doivent rester claires malgré les changements d’équipes, de quarts et d’aménagement.',
        ),
        s(
          'Coordonner plusieurs propriétés',
          'Pour un groupe hôtelier ou un ensemble de salles, préparez un inventaire et un mandat par lieu. Confirmez les modalités propres à chaque propriété.',
        ),
      ],
    },
    related: ['signage', 'programs', 'training'],
  },
  {
    id: 'retail',
    parent: 'industries',
    image: 'readiness',
    intro: {
      en: 'Plan AED locations for customers and staff, from a single store to a shopping centre or retail network.',
      fr: 'Planifiez des DEA pour les clients et les employés, dans une boutique, un centre commercial ou un réseau de magasins.',
    },
    sections: {
      en: [
        s(
          'Clarify tenant and common-area coverage',
          'Identify equipment already managed by the landlord and what each store is responsible for. Shared spaces and stockrooms may have different access arrangements.',
        ),
        s(
          'Keep equipment visible',
          'Review routes from entrances, service desks and busy aisles. Seasonal displays should not obscure signs, block cabinets or conceal the device status indicator.',
        ),
        s(
          'Manage staff turnover',
          'Document the local responsible person and a backup. Include location awareness in staff orientation, and maintain a handover process when stores relocate or managers change.',
        ),
      ],
      fr: [
        s(
          'Clarifier les espaces desservis',
          'Repérez l’équipement déjà géré par le propriétaire et les responsabilités de chaque commerce. Les aires communes et les réserves peuvent présenter des accès différents.',
        ),
        s(
          'Garder l’équipement visible',
          'Examinez les parcours depuis les entrées, les comptoirs de service et les allées principales. Les présentoirs saisonniers ne doivent pas cacher les panneaux ni bloquer les armoires.',
        ),
        s(
          'Prévoir les changements d’équipe',
          'Documentez le responsable local et son remplaçant. Présentez l’emplacement aux nouveaux employés et prévoyez une relève lors de déménagements ou de changements de gestionnaires.',
        ),
      ],
    },
    related: ['programs', 'installation', 'maintenance'],
  },
  {
    id: 'municipalities',
    parent: 'industries',
    image: 'aed-cabinet',
    intro: {
      en: 'Coordinate AED planning across community buildings, recreation facilities and public programs.',
      fr: 'Coordonnez les DEA dans les bâtiments communautaires, les installations récréatives et les programmes publics.',
    },
    sections: {
      en: [
        s(
          'Inventory public facilities',
          'Record existing AEDs, ownership, access hours, supplies and responsible departments. Include libraries, arenas, community halls and seasonal facilities in the review where relevant.',
        ),
        s(
          'Separate indoor and outdoor needs',
          'Public access does not automatically mean outdoor placement. Review weather exposure, environmental limits, power needs and security without creating unnecessary retrieval barriers.',
        ),
        s(
          'Define procurement and reporting',
          'Include quantities, sites, language needs, installation and training requirements in the procurement scope. Confirm applicable local rules and any AED registration arrangements with the appropriate local authority.',
        ),
      ],
      fr: [
        s(
          'Inventorier les installations',
          'Consignez les DEA existants, leur propriétaire, les heures d’accès, les fournitures et les services responsables. Incluez, selon le cas, bibliothèques, arénas, salles communautaires et lieux saisonniers.',
        ),
        s(
          'Distinguer les besoins intérieurs et extérieurs',
          'L’accès public ne signifie pas automatiquement une installation extérieure. Examinez les intempéries, les limites environnementales, l’alimentation et la sécurité sans créer d’obstacles inutiles.',
        ),
        s(
          'Définir l’achat et les rapports',
          'Précisez les quantités, les lieux, les langues, l’installation et la formation dans le mandat d’achat. Confirmez les règles applicables et les modalités d’enregistrement auprès de l’autorité locale appropriée.',
        ),
      ],
    },
    related: ['programs', 'cabinets', 'quote'],
  },
  {
    id: 'residential',
    parent: 'industries',
    image: 'maintenance',
    intro: {
      en: 'Discuss an AED for your home with a practical plan for access, compatible supplies and household learning.',
      fr: 'Discutez d’un DEA à la maison avec un plan concret d’accès, de fournitures compatibles et d’apprentissage familial.',
    },
    sections: {
      en: [
        s(
          'Start with your household’s questions',
          'Tell us who needs to understand the device, the preferred language and any storage constraints. Ask a qualified health professional about medical questions or whether an AED is appropriate for a particular person.',
        ),
        s(
          'Plan storage and upkeep',
          'Follow the manufacturer’s storage instructions and choose a location household members can find. Assign someone to check status and supply dates; a home device still needs ongoing attention.',
        ),
        s(
          'Keep the request simple',
          'Email your province, desired equipment or questions, and whether you want training coordination. Do not send personal medical records. A home AED does not replace emergency services or clinical care.',
        ),
      ],
      fr: [
        s(
          'Commencer par les questions de la famille',
          'Précisez qui doit comprendre l’appareil, la langue souhaitée et les contraintes de rangement. Consultez un professionnel de la santé pour les questions médicales ou la pertinence d’un DEA pour une personne.',
        ),
        s(
          'Prévoir rangement et suivi',
          'Suivez les consignes d’entreposage du fabricant et choisissez un lieu connu de la famille. Désignez une personne pour vérifier l’état et les dates; un appareil résidentiel nécessite aussi un suivi.',
        ),
        s(
          'Faire une demande simple',
          'Envoyez votre province, l’équipement souhaité ou vos questions et votre intérêt pour une formation. Ne transmettez pas de dossiers médicaux. Un DEA résidentiel ne remplace ni les services d’urgence ni les soins cliniques.',
        ),
      ],
    },
    related: ['buying', 'quote', 'training'],
  },
  {
    id: 'resources',
    image: 'training',
    children: [
      'buying',
      'costs',
      'care',
      'compare',
      'packages',
      'parts',
      'locations',
      'faq',
    ],
    intro: {
      en: 'Practical questions and planning guides to help you organise an AED purchase and ongoing care.',
      fr: 'Des questions pratiques et des guides pour organiser l’achat d’un DEA et son suivi.',
    },
    sections: {
      en: [
        s(
          'Use the right source for the task',
          'These guides support purchasing and program planning. For operation, troubleshooting and replacement procedures, use the current instructions supplied with your exact device. For emergency response learning, use qualified training providers.',
        ),
      ],
      fr: [
        s(
          'Consulter la bonne source',
          'Ces guides soutiennent l’achat et la planification. Pour l’utilisation, le dépannage et le remplacement, consultez les instructions actuelles de votre appareil exact. Pour apprendre les gestes d’urgence, faites appel à des formateurs qualifiés.',
        ),
      ],
    },
    related: ['training', 'contact'],
  },
  {
    id: 'about',
    image: 'readiness',
    intro: {
      en: 'Defibrillators.ca is operated by Superclean Canada Inc. We help Canadian workplaces, communities and households choose AED equipment and arrange the support they need.',
      fr: 'Defibrillators.ca est exploité par Superclean Canada Inc. Nous aidons les milieux de travail, les collectivités et les familles du Canada à choisir leur équipement de DEA et les services adaptés à leurs besoins.',
    },
    sections: {
      en: [
        s(
          'Equipment and support, together',
          'Our focus includes AED sales, accessories, installation planning, readiness inspections, multi-location programs and training coordination. We work directly with customers to define their requirements.',
        ),
        s(
          'A clear scope for every enquiry',
          'Suitable equipment, product availability and service arrangements are confirmed for each project. Your quote identifies the equipment, services and any partners involved.',
        ),
        s(
          'Workplaces and homes',
          'Commercial and institutional procurement can involve several locations and stakeholders. Residential enquiries can be simpler. Both deserve clear information, French or English communication and a realistic plan for ongoing care.',
        ),
      ],
      fr: [
        s(
          'Équipement et accompagnement réunis',
          'Nos activités visent la vente de DEA, les accessoires, la planification de l’installation, les vérifications, les programmes multisites et la coordination de formations. Nous travaillons directement avec les clients pour définir leurs besoins.',
        ),
        s(
          'Un mandat clair pour chaque demande',
          'L’équipement approprié, la disponibilité et les modalités de service sont confirmés pour chaque projet. Votre soumission précise l’équipement, les services et les partenaires concernés.',
        ),
        s(
          'Au travail et à la maison',
          'Les achats commerciaux et institutionnels peuvent concerner plusieurs lieux et intervenants. Les demandes résidentielles peuvent être plus simples. Toutes méritent une information claire, en français ou en anglais, et un plan réaliste de suivi.',
        ),
      ],
    },
    related: ['services', 'industries', 'contact'],
  },
  {
    id: 'contact',
    kind: 'contact',
    intro: {
      en: 'Contact us about AED equipment, accessories or a service project. English and French enquiries are welcome.',
      fr: 'Communiquez avec nous au sujet d’un DEA, d’accessoires ou d’un projet de service. Les demandes en français et en anglais sont les bienvenues.',
    },
    sections: {
      en: [
        s(
          'Help us understand your request',
          'Include your province, type of location and a short description of what you need. For existing equipment, include the make and model. There is no need to send medical records or payment details.',
        ),
        s(
          'Planning across Canada',
          'Share the actual site locations so product delivery and service arrangements can be confirmed. We’ll review delivery and on-site service options with you.',
        ),
      ],
      fr: [
        s(
          'Aidez-nous à comprendre votre demande',
          'Indiquez votre province, le type de lieu et une brève description de vos besoins. Pour un appareil existant, précisez la marque et le modèle. N’envoyez ni dossiers médicaux ni renseignements de paiement.',
        ),
        s(
          'Planifier partout au Canada',
          'Précisez les lieux réels pour confirmer la livraison et les modalités de service. Ce site n’annonce pas de succursales ni de délai de réponse garanti.',
        ),
      ],
    },
    related: ['quote', 'faq', 'accessibility'],
  },
  {
    id: 'quote',
    kind: 'quote',
    intro: {
      en: 'Tell us about your equipment or service needs. Choose the business or home form, and we will review the details with you.',
      fr: 'Décrivez vos besoins en équipement ou en services. Choisissez le formulaire pour entreprise ou résidence; nous examinerons les détails avec vous.',
    },
    sections: {
      en: [
        s(
          'Commercial & institutional projects',
          'Include what you know; you can discuss the remaining details with us.',
          [
            'Organisation and contact name',
            'Province and delivery or service locations',
            'Number of AEDs and preferred models, if known',
            'Accessories, installation, inspections or training needs',
            'Procurement requirements and desired timing',
          ],
        ),
        s('Homes & families', 'A residential request can be brief.', [
          'Your name and preferred contact method',
          'Province and delivery area',
          'AED model or questions you would like to discuss',
          'Accessories or training coordination needed',
        ]),
        s(
          'What happens next',
          'We’ll review your requirements and contact you to confirm the details for a written quote. If you have a deadline, include it in your message.',
        ),
      ],
      fr: [
        s(
          'Projets commerciaux et institutionnels',
          'Indiquez ce que vous savez; les autres détails peuvent être discutés avec nous.',
          [
            'Organisation et personne-ressource',
            'Province et lieux de livraison ou de service',
            'Nombre de DEA et modèles souhaités, si connus',
            'Accessoires, installation, vérifications ou formation',
            'Exigences d’achat et échéancier souhaité',
          ],
        ),
        s(
          'Résidences et familles',
          'Une demande résidentielle peut être courte.',
          [
            'Votre nom et le moyen de communication préféré',
            'Province et secteur de livraison',
            'Modèle de DEA ou questions à discuter',
            'Accessoires ou coordination de formation nécessaires',
          ],
        ),
        s(
          'La suite de votre demande',
          'Nous examinerons vos besoins et vous contacterons pour préciser les détails d’une soumission écrite. Si vous avez une échéance, indiquez-la dans votre message.',
        ),
      ],
    },
    related: ['buying', 'privacy', 'contact'],
  },
  {
    id: 'faq',
    kind: 'faq',
    parent: 'resources',
    intro: {
      en: 'Answers to common questions about equipment, accessories, service scope and planning your request.',
      fr: 'Des réponses aux questions courantes sur l’équipement, les accessoires, les services et la préparation de votre demande.',
    },
    sections: {
      en: [
        s(
          'Do you accept home enquiries?',
          'Yes. We welcome residential, commercial and institutional enquiries. For a home request, tell us your province, equipment questions and whether you want training coordination.',
        ),
        s(
          'Are the displayed models in stock?',
          'The model pages are manufacturer reference profiles. Stock, pricing, configuration and Canadian licence verification are not confirmed on this website and must be established before any sale.',
        ),
        s(
          'How do I order replacement pads or a battery?',
          'Provide the AED make, exact model and the part number of the current supply. Include quantities and your location. Compatibility is checked for the specific device.',
        ),
        s(
          'Do readiness inspections include repairs?',
          'No. A readiness inspection can check status, supplies, dates, access and condition. Repairs and manufacturer-specific servicing need the appropriate qualified or authorized provider.',
        ),
        s(
          'Is an AED required at every workplace?',
          'This website does not make that claim. Requirements vary by jurisdiction and facility. Check the rules applicable to your location with an appropriate adviser.',
        ),
        s(
          'Who delivers training?',
          'Training is coordinated through qualified partners. The provider, instructor credentials, course, certification and availability must be confirmed before booking.',
        ),
        s(
          'Can I pay or submit a form here?',
          'You can send a business or residential request using our bilingual quote forms. There is no online checkout. A written quote confirms availability and commercial details before any order.',
        ),
      ],
      fr: [
        s(
          'Acceptez-vous les demandes résidentielles?',
          'Oui. Nous accueillons les demandes résidentielles, commerciales et institutionnelles. Pour une résidence, indiquez la province, vos questions et votre intérêt pour une formation.',
        ),
        s(
          'Les modèles affichés sont-ils en stock?',
          'Les pages de modèles sont des fiches de référence du fabricant. Le stock, le prix, la configuration et l’homologation canadienne ne sont pas confirmés sur ce site et doivent être établis avant une vente.',
        ),
        s(
          'Comment commander des électrodes ou une batterie?',
          'Fournissez la marque, le modèle exact et le numéro de pièce de la fourniture actuelle. Ajoutez les quantités et l’emplacement. La compatibilité est vérifiée pour l’appareil précis.',
        ),
        s(
          'Les vérifications comprennent-elles les réparations?',
          'Non. Une vérification peut porter sur l’état, les fournitures, les dates, l’accès et la condition physique. Les réparations et le service propre au fabricant exigent un intervenant qualifié ou autorisé.',
        ),
        s(
          'Un DEA est-il obligatoire dans tous les lieux de travail?',
          'Ce site ne fait pas cette affirmation. Les exigences varient selon le territoire et le type d’établissement. Vérifiez les règles de votre emplacement avec un conseiller approprié.',
        ),
        s(
          'Qui donne la formation?',
          'Les formations sont coordonnées avec des partenaires qualifiés. Le fournisseur, les qualifications, le cours, la certification et la disponibilité doivent être confirmés avant la réservation.',
        ),
        s(
          'Puis-je payer ou envoyer un formulaire ici?',
          'Vous pouvez envoyer une demande pour entreprise ou résidence avec nos formulaires bilingues. Aucun paiement en ligne n’est offert. La disponibilité et les modalités commerciales sont confirmées par écrit avant toute commande.',
        ),
      ],
    },
    related: ['quote', 'services', 'buying'],
  },
  {
    id: 'buying',
    parent: 'resources',
    image: 'readiness',
    intro: {
      en: 'A practical sequence for specifying an AED purchase without overlooking access, supplies and ongoing responsibilities.',
      fr: 'Une démarche pratique pour définir l’achat d’un DEA sans oublier l’accès, les fournitures et les responsabilités de suivi.',
    },
    sections: {
      en: [
        s(
          '1. Describe the setting',
          'Record the location, people served, language needs and environmental conditions. Consider building access and who will be responsible for the equipment.',
        ),
        s(
          '2. Review the exact device',
          'Read manufacturer information and compare suitable configurations. Ask the supplier to verify the device identifier and active Canadian licence, not just a familiar model name.',
        ),
        s(
          '3. Include the surrounding equipment',
          'Specify compatible pads and batteries, storage or cabinet, signage and supporting supplies. Confirm quantities and what is actually included in the quote.',
        ),
        s(
          '4. Budget for ongoing care',
          'Consider replacement supplies, readiness checks and training coordination as well as the initial device. Ask for documented warranty and service terms; do not infer them from a different country or package.',
        ),
        s(
          '5. Plan the handover',
          'Keep the quote, instructions, equipment record and local responsibilities together. Agree how supplies will be replenished and issues escalated.',
        ),
      ],
      fr: [
        s(
          '1. Décrire le milieu',
          'Notez le lieu, les personnes desservies, les besoins linguistiques et les conditions environnementales. Considérez l’accès au bâtiment et la personne responsable.',
        ),
        s(
          '2. Examiner l’appareil exact',
          'Consultez le fabricant et comparez les configurations pertinentes. Demandez au fournisseur de vérifier l’identifiant et l’homologation canadienne active, pas seulement un nom de modèle connu.',
        ),
        s(
          '3. Inclure l’équipement connexe',
          'Précisez les électrodes et les batteries compatibles, le rangement ou l’armoire, la signalisation et les fournitures. Confirmez les quantités et les articles réellement inclus.',
        ),
        s(
          '4. Prévoir les coûts de suivi',
          'Considérez les remplacements, les vérifications et la formation en plus de l’appareil initial. Demandez les modalités écrites de garantie et de service sans les déduire d’une autre région ou d’un autre ensemble.',
        ),
        s(
          '5. Organiser la remise',
          'Regroupez la soumission, les instructions, la fiche d’équipement et les responsabilités locales. Convenez du réapprovisionnement et du traitement des problèmes.',
        ),
      ],
    },
    related: ['compare', 'packages', 'costs', 'installation', 'care', 'quote'],
  },
  {
    id: 'care',
    parent: 'resources',
    image: 'maintenance',
    intro: {
      en: 'Use a documented readiness process alongside the instructions for your exact AED. This guide is a planning aid, not a repair manual.',
      fr: 'Utilisez un processus documenté avec les instructions de votre DEA exact. Ce guide aide à planifier; il ne remplace pas un manuel technique.',
    },
    sections: {
      en: [
        s(
          'Keep an equipment record',
          'Record the device model and serial number, location, responsible person, pad expiry and battery information. Note relevant manufacturer instructions and how to reach the service provider.',
        ),
        s(
          'Agree the check schedule',
          'Follow the manufacturer’s inspection guidance and your organisation’s requirements. A generic monthly or annual interval is not appropriate for every device or setting.',
        ),
        s(
          'Record what you observe',
          'Check the visible status indication, physical condition, supplies and access according to the instructions. Document the date, checker, findings and required actions. Do not open the device housing or attempt technical repairs.',
        ),
        s(
          'Escalate a problem',
          'If a fault is reported, use the manufacturer’s instructions and qualified service channel. Inform the site’s responsible person and follow the local plan for equipment that is unavailable.',
        ),
        s(
          'After use or relocation',
          'Follow manufacturer and local procedures for replacement supplies, checks and records. Revisit access and signage after a move. Keep any incident information out of ordinary website enquiries.',
        ),
      ],
      fr: [
        s(
          'Conserver une fiche d’équipement',
          'Notez le modèle, le numéro de série, le lieu, le responsable, l’expiration des électrodes et les renseignements de batterie. Identifiez les instructions pertinentes et le fournisseur de service.',
        ),
        s(
          'Convenir du calendrier',
          'Suivez les consignes d’inspection du fabricant et les exigences de l’organisation. Un intervalle mensuel ou annuel général ne convient pas à tous les appareils et milieux.',
        ),
        s(
          'Consigner les observations',
          'Vérifiez le témoin d’état, la condition physique, les fournitures et l’accès selon les instructions. Notez la date, la personne, les constats et les actions. N’ouvrez pas le boîtier et ne tentez pas de réparation technique.',
        ),
        s(
          'Signaler un problème',
          'En cas de défaillance, suivez les instructions et recourez au service qualifié. Informez le responsable du lieu et appliquez le plan local pour un équipement indisponible.',
        ),
        s(
          'Après utilisation ou déplacement',
          'Suivez les procédures de remplacement, de vérification et de consignation. Réévaluez l’accès et la signalisation après un déplacement. N’incluez pas de renseignements d’incident dans une demande ordinaire au site.',
        ),
      ],
    },
    related: ['maintenance', 'pads', 'batteries', 'training'],
  },
  {
    id: 'privacy',
    intro: {
      en: 'This notice describes browsing Defibrillators.ca and the information you choose to send in an enquiry.',
      fr: 'Cet avis décrit la navigation sur Defibrillators.ca et les renseignements que vous choisissez de transmettre dans une demande.',
    },
    sections: {
      en: [
        s(
          'Browsing this website',
          'The site is hosted by WHC. Fonts and images are served with the website. Hosting infrastructure may process connection information and server logs. The site does not offer customer accounts or collect payments.',
        ),
        s(
          'Browsing and measurement',
          'This website does not load Google Analytics or set analytics cookies. On a return visit, it removes the preference and cookies from our previous analytics integration. This does not delete data already collected by Google. Hosting logs and information you submit through the enquiry form are handled separately.',
        ),
        s(
          'Information you choose to send',
          'Our request forms send contact details, project requirements, any attachment and the privacy notice shown when you send the form to Formspree for processing and delivery to our enquiry inbox. Formspree records receipt and may process data outside Canada. Sending a request does not subscribe you to marketing. Phone and email links use your own applications. Share only what is needed for your enquiry. Do not send payment card details, medical records or sensitive incident information.',
        ),
        s(
          'External links',
          'Manufacturer and reference links lead to other organisations. Their websites and any email or telephone service you use have their own privacy practices.',
        ),
        s(
          'Privacy questions',
          'Contact info@defibrillators.ca with privacy questions or a request concerning information you have sent. Please identify the enquiry concerned without including medical records or payment details.',
        ),
      ],
      fr: [
        s(
          'Navigation sur ce site',
          'Le site est hébergé par WHC. Les polices et images sont servies avec le site. L’infrastructure d’hébergement peut traiter des données de connexion et des journaux serveur. Le site ne propose pas de comptes clients et ne perçoit pas de paiements.',
        ),
        s(
          'Navigation et mesure',
          'Ce site ne charge pas Google Analytics et ne crée pas de témoins analytiques. À votre retour, il retire la préférence et les témoins de notre ancienne intégration. Cela ne supprime pas les données déjà recueillies par Google. Les journaux d’hébergement et les renseignements transmis par le formulaire sont traités séparément.',
        ),
        s(
          'Renseignements transmis volontairement',
          'Nos formulaires transmettent à Formspree vos coordonnées, les besoins du projet, toute pièce jointe et l’avis de confidentialité présenté à l’envoi, pour traitement et livraison à notre boîte de réception. Formspree enregistre la réception et peut traiter les données hors du Canada. L’envoi d’une demande ne vous inscrit à aucune communication marketing. Les liens de téléphone et de courriel utilisent vos applications. Transmettez uniquement les renseignements nécessaires. N’envoyez pas de numéros de carte, de dossiers médicaux ni de renseignements sensibles sur un incident.',
        ),
        s(
          'Liens externes',
          'Les liens de fabricants et de référence mènent à d’autres organismes. Leurs sites et les services de courriel ou de téléphonie que vous utilisez ont leurs propres pratiques de confidentialité.',
        ),
        s(
          'Questions de confidentialité',
          'Écrivez à info@defibrillators.ca pour une question ou une demande relative aux renseignements transmis. Précisez la demande concernée sans transmettre de dossier médical ni de renseignement de paiement.',
        ),
      ],
    },
    related: ['contact', 'terms', 'accessibility'],
  },
  {
    id: 'terms',
    intro: {
      en: 'Read these informational website terms alongside any written quote and the instructions supplied with your equipment. These terms require operator review before public launch.',
      fr: 'Lisez ces conditions du site avec toute soumission écrite et les instructions de votre équipement. L’exploitant doit les réviser avant le lancement public.',
    },
    sections: {
      en: [
        s(
          'Information and enquiries',
          'Content supports equipment research and project enquiries. Displayed model information and photographs do not establish inventory, dealership authorization, Canadian licensing or suitability for a particular person. An enquiry does not create an order or reserve a product.',
        ),
        s(
          'Commercial details',
          'Prices, taxes, delivery, availability, included items, warranty, cancellation and return conditions must be confirmed in the applicable written quote or agreement. No checkout or payment processing is provided on this site.',
        ),
        s(
          'Medical and technical information',
          'This website does not provide emergency response, individual medical advice or permission to repair a device. Follow local emergency procedures and the exact manufacturer instructions. Direct medical questions to an appropriate health professional.',
        ),
        s(
          'Content and external sources',
          'Brand assets and original site content are distinct from third-party photographs, manufacturer names and linked documents. Photo credits state the applicable licences. External sources may change; check current manufacturer documents when making a decision.',
        ),
        s(
          'Questions and corrections',
          'Contact info@defibrillators.ca to ask about a quote, report inaccurate information or clarify the intended scope. Your written quote sets out the terms that apply to your purchase.',
        ),
      ],
      fr: [
        s(
          'Information et demandes',
          'Le contenu sert à la recherche d’équipement et aux demandes de projet. Les modèles et photos n’établissent ni inventaire, ni autorisation de fabricant, ni homologation canadienne, ni pertinence pour une personne. Une demande ne crée pas de commande et ne réserve pas un produit.',
        ),
        s(
          'Modalités commerciales',
          'Le prix, les taxes, la livraison, la disponibilité, les articles inclus, la garantie, l’annulation et les retours doivent être confirmés dans la soumission ou l’entente applicable. Aucun paiement en ligne n’est offert ici.',
        ),
        s(
          'Information médicale et technique',
          'Ce site n’offre pas d’intervention d’urgence, de conseil médical individuel ni d’autorisation de réparer un appareil. Suivez les procédures locales et les instructions exactes du fabricant. Consultez un professionnel approprié pour les questions médicales.',
        ),
        s(
          'Contenu et sources externes',
          'Les éléments de marque et le contenu original sont distincts des photos de tiers, des noms de fabricants et des documents liés. Les crédits indiquent les licences. Les sources externes peuvent changer; consultez les documents actuels pour décider.',
        ),
        s(
          'Questions et corrections',
          'Écrivez à info@defibrillators.ca pour une question de soumission, une correction ou une précision. Votre soumission écrite précise les modalités applicables à votre achat.',
        ),
      ],
    },
    related: ['privacy', 'contact', 'quote'],
  },
  {
    id: 'accessibility',
    intro: {
      en: 'We aim to make AED information and enquiries usable by people with different access needs, in English and French.',
      fr: 'Nous visons à rendre l’information et les demandes accessibles à des personnes ayant des besoins variés, en français et en anglais.',
    },
    sections: {
      en: [
        s(
          'Website features',
          'The site includes a skip link, keyboard-accessible navigation and disclosures, visible focus indicators, text alternatives for meaningful images and layouts that adapt to small screens. Language links lead to the equivalent page.',
        ),
        s(
          'Current testing scope',
          'The implementation targets WCAG 2.2 AA and has been checked with automated page tests and a browser at several widths. This is not a claim of full conformance certification. Broader assistive-technology and user testing remains necessary.',
        ),
        s(
          'Request help or report a barrier',
          'Email info@defibrillators.ca or call (833) 696-9996. Describe the page, the difficulty and the format or support that would help. Include browser or assistive-technology details only if you are comfortable sharing them.',
        ),
        s(
          'Third-party material',
          'Linked manufacturer documents and external sites are outside our control. If a linked document is difficult to access, contact us to discuss the information you need in another format.',
        ),
      ],
      fr: [
        s(
          'Fonctions du site',
          'Le site comprend un lien d’évitement, une navigation et des volets utilisables au clavier, des indicateurs de focus, des textes de remplacement et des mises en page adaptées aux petits écrans. Les liens de langue mènent à la page équivalente.',
        ),
        s(
          'Portée des vérifications',
          'La réalisation vise les WCAG 2.2 AA et a fait l’objet de tests automatisés et de vérifications dans un navigateur à plusieurs largeurs. Il ne s’agit pas d’une certification de conformité complète. D’autres essais avec des technologies d’assistance et des utilisateurs restent nécessaires.',
        ),
        s(
          'Demander de l’aide ou signaler un obstacle',
          'Écrivez à info@defibrillators.ca ou appelez le (833) 696-9996. Décrivez la page, la difficulté et le format ou l’aide souhaités. Communiquez les détails techniques seulement si vous êtes à l’aise.',
        ),
        s(
          'Documents de tiers',
          'Les documents de fabricants et les sites externes échappent à notre contrôle. Si un document lié est difficile à consulter, contactez-nous pour discuter d’un autre format.',
        ),
      ],
    },
    related: ['contact', 'privacy'],
  },
];
for (const offering of offeringPages) {
  const parent = pages.find((page) => page.id === offering.parent)!;
  parent.children = [...(parent.children ?? []), offering.id];
}
for (const page of pages) {
  page.image = pageVisuals[page.id];
  const guide = guideDetails[page.id];
  if (guide) {
    page.kind = 'guide';
    page.guide = guide;
  }
}
export function pageFor(id: PageId): DetailPage {
  const page = pages.find((p) => p.id === id);
  if (!page) throw new Error(`Missing page: ${id}`);
  return page;
}
