import type { DetailPage, Localized, Section } from './pages';
import type { LocationId } from './location-routes';
import type { PageId } from './routes';

const l = <T>(en: T, fr: T): Localized<T> => ({ en, fr });
const s = (en: string, fr: string, bodyEn: string, bodyFr: string) => ({
  heading: l(en, fr),
  body: l(bodyEn, bodyFr),
});
interface Guide {
  id: LocationId;
  code: string;
  place: Localized<string>;
  parent?: LocationId;
  intro: Localized<string>;
  sections: ReturnType<typeof s>[];
  checklist: Localized<string>[];
  faqs: ReturnType<typeof s>[];
  children?: LocationId[];
  related: PageId[];
}

// Editorial planning scenarios, not verified local branches or installation promises.
export const locationGuides: Guide[] = [
  {
    id: 'locations',
    code: 'CA',
    place: l('Canada', 'Canada'),
    intro: l(
      'Plan an AED purchase around the place it will serve. Explore provincial, territorial and city guides for delivery, access, language needs and ongoing checks.',
      'Planifiez votre achat de DEA selon le lieu à desservir. Consultez nos guides des provinces, territoires et villes sur la livraison, l’accès, les langues et les vérifications.',
    ),
    sections: [
      s(
        'Start with a site brief',
        'Commencez par une fiche du lieu',
        'A single home, a shared building and a distributed property portfolio need different conversations. Record the intended location, who can reach the device, operating hours and the person who will arrange checks. For several sites, use one row per address so that a shared purchasing decision does not hide differences in access or delivery.',
        'Une résidence, un immeuble partagé et un parc immobilier demandent des échanges différents. Notez l’emplacement prévu, les personnes qui peuvent accéder à l’appareil, les heures d’ouverture et la personne responsable des vérifications. Pour plusieurs lieux, prévoyez une ligne par adresse afin de conserver les particularités d’accès et de livraison.',
      ),
      s(
        'Separate equipment from service arrangements',
        'Distinguez équipement et modalités de service',
        'A delivery address is not confirmation of an installation visit. Request separate scopes for equipment, cabinet mounting, readiness checks and training coordination. Tell us whether the setting is permanently occupied or seasonal and whether deliveries require a receiving appointment. The written quote will identify the arrangements that can be supported for each site.',
        'Une adresse de livraison ne confirme pas une visite d’installation. Demandez des portées distinctes pour l’équipement, la fixation de l’armoire, les vérifications et la coordination de formations. Précisez si le lieu est occupé en permanence ou de façon saisonnière et si la réception exige un rendez-vous. La soumission écrite indiquera les modalités possibles pour chaque lieu.',
      ),
    ],
    checklist: [
      l(
        'Province or territory, community and postal code for each destination',
        'Province ou territoire, communauté et code postal de chaque destination',
      ),
      l(
        'Public access hours, site contact and preferred communication language',
        'Heures d’accès public, personne-ressource et langue de communication souhaitée',
      ),
      l(
        'Equipment already owned, exact model and replacement-supply needs',
        'Équipement déjà détenu, modèle exact et besoins en fournitures de remplacement',
      ),
      l(
        'Separate requests for delivery, installation, checks and training',
        'Demandes distinctes de livraison, d’installation, de vérification et de formation',
      ),
    ],
    faqs: [
      s(
        'Do these guides confirm local availability?',
        'Ces guides confirment-ils une disponibilité locale?',
        'No. They help you prepare an enquiry. Equipment availability, delivery terms, site visits and partner arrangements must be confirmed in writing for the address supplied.',
        'Non. Ils vous aident à préparer une demande. La disponibilité, les modalités de livraison, les visites et les arrangements avec des partenaires doivent être confirmés par écrit pour l’adresse indiquée.',
      ),
      s(
        'Can a household use the same enquiry process?',
        'Une famille peut-elle utiliser ce processus?',
        'Yes. Choose Home & family on the quote page. A short description of your location and equipment questions is enough to start; a company name is not required.',
        'Oui. Choisissez Résidence et famille sur la page de soumission. Une brève description du lieu et de vos questions sur l’équipement suffit pour commencer; aucun nom d’entreprise n’est requis.',
      ),
    ],
    children: [
      'bc',
      'alberta',
      'saskatchewan',
      'manitoba',
      'ontario',
      'quebec',
      'nb',
      'ns',
      'pei',
      'nl',
      'yukon',
      'nwt',
      'nunavut',
    ],
    related: ['buying', 'programs', 'residential'],
  },
  {
    id: 'ontario',
    code: 'ON',
    place: l('Ontario', 'Ontario'),
    parent: 'locations',
    intro: l(
      'Prepare an Ontario AED project for a shared building, a regional portfolio or a seasonal property. Define site access, receiving arrangements and who owns each readiness check.',
      'Préparez un projet de DEA en Ontario pour un immeuble partagé, un parc régional ou une propriété saisonnière. Précisez l’accès, la réception et les responsabilités de vérification.',
    ),
    sections: [
      s(
        'One portfolio, several access arrangements',
        'Un parc immobilier, plusieurs modalités d’accès',
        'For properties across Toronto, Ottawa and other Ontario communities, separate the purchasing contact from the contact at each building. A central invoice does not tell a delivery team which entrance to use or who can approve a cabinet location. Ask each site to record staffed hours, controlled doors, shared spaces and a receiving contact before consolidating the equipment request.',
        'Pour des propriétés à Toronto, à Ottawa et ailleurs en Ontario, distinguez le contact aux achats du contact de chaque immeuble. Une facture centralisée ne précise ni l’entrée de livraison ni la personne qui peut approuver l’emplacement d’une armoire. Faites consigner les heures de présence, les portes contrôlées, les espaces partagés et le contact à la réception avant de regrouper les besoins.',
      ),
      s(
        'Plan the handover at a seasonal property',
        'Planifiez la relève dans une propriété saisonnière',
        'If an AED is intended for a cottage property, camp or seasonal recreation building, identify what happens when the site closes. Ask who retains access, where the device will be kept and how the reopening check will be recorded. Storage and transport conditions must follow the exact manufacturer instructions; an unoccupied or unheated building should not be assumed suitable.',
        'Si le DEA est destiné à un chalet, un camp ou un bâtiment de loisirs saisonnier, définissez les modalités de fermeture. Demandez qui conserve l’accès, où l’appareil sera gardé et comment la vérification à la réouverture sera consignée. L’entreposage et le transport doivent respecter les instructions du fabricant; ne présumez pas qu’un bâtiment vide ou non chauffé convient.',
      ),
    ],
    checklist: [
      l(
        'A separate address and site contact for every building',
        'Une adresse et une personne-ressource par immeuble',
      ),
      l(
        'Lobby, floor and door-access details',
        'Précisions sur le hall, l’étage et l’accès aux portes',
      ),
      l(
        'Seasonal closing and reopening responsibilities',
        'Responsabilités à la fermeture et à la réouverture saisonnières',
      ),
      l(
        'Preferred device, documentation and training languages',
        'Langues souhaitées pour l’appareil, la documentation et la formation',
      ),
    ],
    faqs: [
      s(
        'Can we request one quote for several Ontario sites?',
        'Peut-on demander une soumission pour plusieurs lieux en Ontario?',
        'Yes. List each address, the quantity to discuss and any different access or delivery requirements. Ask for site-specific service items within the overall quote.',
        'Oui. Indiquez chaque adresse, la quantité à discuter et les particularités d’accès ou de livraison. Demandez que les services propres à chaque lieu soient détaillés dans la soumission globale.',
      ),
      s(
        'Should a shared lobby be the default location?',
        'Faut-il choisir automatiquement un hall partagé?',
        'No. Review who can reach it during all intended access hours and whether doors, floors or restricted areas interrupt the route. Confirm the location with the building operator before mounting.',
        'Non. Vérifiez qui peut l’atteindre pendant les heures d’accès prévues et si des portes, étages ou zones restreintes coupent le trajet. Confirmez l’emplacement avec l’exploitant avant la fixation.',
      ),
    ],
    children: ['toronto'],
    related: ['properties', 'programs', 'installation'],
  },
  {
    id: 'quebec',
    code: 'QC',
    place: l('Québec', 'Québec'),
    parent: 'locations',
    intro: l(
      'Build a Québec AED brief that treats French-language equipment information, shared-property decisions and seasonal access as part of the purchase from the start.',
      'Préparez votre projet de DEA au Québec en intégrant dès le départ l’information en français, les décisions en copropriété et les modalités d’accès saisonnier.',
    ),
    sections: [
      s(
        'Specify the language of each deliverable',
        'Précisez la langue de chaque élément',
        'Record your requirements for device prompts, labels, instructions, training and the service record separately. A bilingual website does not establish the languages supplied with a particular device. Ask for confirmation of the exact Canadian configuration and documentation before choosing a model. Have the organisation’s advisers review the language obligations that apply to its situation.',
        'Précisez séparément les besoins pour les messages de l’appareil, les étiquettes, les instructions, la formation et le registre de suivi. Un site bilingue ne confirme pas les langues fournies avec un appareil donné. Faites confirmer la configuration canadienne exacte et sa documentation avant de choisir un modèle. Faites examiner les obligations linguistiques applicables par les conseillers de votre organisation.',
      ),
      s(
        'Agree on responsibility in a shared property',
        'Convenez des responsabilités en copropriété',
        'For a condominium or a building with several occupants, identify who approves the purchase, cabinet placement and recurring checks. Keep the access plan separate from the administrative approval: residents, visitors and staff may use different doors. For a seasonal property, include a closing handover and a reopening review rather than assuming the same person will remain on site.',
        'Dans une copropriété ou un immeuble à occupants multiples, identifiez qui approuve l’achat, l’emplacement de l’armoire et les vérifications récurrentes. Distinguez le plan d’accès de l’autorisation administrative : résidents, visiteurs et personnel peuvent utiliser des portes différentes. Pour une propriété saisonnière, prévoyez une relève à la fermeture et une vérification à la réouverture.',
      ),
    ],
    checklist: [
      l(
        'French-language prompts and documents to confirm for the exact model',
        'Messages et documents en français à confirmer pour le modèle exact',
      ),
      l(
        'Purchase approval and cabinet-mounting authority',
        'Autorisation d’achat et de fixation de l’armoire',
      ),
      l(
        'Access for residents, staff and visitors at different times',
        'Accès des résidents, du personnel et des visiteurs selon l’heure',
      ),
      l(
        'Named person responsible for records and replacement supplies',
        'Responsable désigné des registres et des fournitures de remplacement',
      ),
    ],
    faqs: [
      s(
        'Can the quote and follow-up be in French?',
        'La soumission et le suivi peuvent-ils se faire en français?',
        'Yes. Use the French form and state your preferred communication language. Device-language and training-language requirements should also be written in the request.',
        'Oui. Utilisez le formulaire français et indiquez votre langue de communication souhaitée. Inscrivez aussi les besoins linguistiques pour l’appareil et la formation.',
      ),
      s(
        'Does a bilingual device settle every language requirement?',
        'Un appareil bilingue règle-t-il toutes les exigences linguistiques?',
        'No. Documentation, signage, training and business communications are separate considerations. Confirm the supplied materials and obtain advice for the obligations applicable to your organisation.',
        'Non. La documentation, la signalisation, la formation et les communications commerciales sont des éléments distincts. Confirmez les documents fournis et obtenez des conseils sur les obligations de votre organisation.',
      ),
    ],
    children: ['montreal'],
    related: ['properties', 'training', 'buying'],
  },
  {
    id: 'bc',
    code: 'BC',
    place: l('British Columbia', 'Colombie-Britannique'),
    parent: 'locations',
    intro: l(
      'Scope a British Columbia AED project with separate plans for building access, coastal or interior destinations and any delivery that involves an island or remote receiving point.',
      'Précisez votre projet de DEA en Colombie-Britannique : accès au bâtiment, destination côtière ou intérieure et livraison vers une île ou un point de réception éloigné.',
    ),
    sections: [
      s(
        'Make the receiving route explicit',
        'Précisez le trajet jusqu’à la réception',
        'A Vancouver delivery and an island or interior destination should not be treated as interchangeable. Give the actual receiving address, any onward transfer and the person who accepts the parcel. If access depends on a ferry, a separate carrier or a restricted loading area, include that constraint in the request. Transport options and timing need written confirmation for the destination.',
        'Une livraison à Vancouver et une destination insulaire ou intérieure ne sont pas interchangeables. Fournissez l’adresse de réception réelle, tout transfert ultérieur et la personne qui acceptera le colis. Si l’accès dépend d’un traversier, d’un autre transporteur ou d’un quai restreint, indiquez-le dans la demande. Faites confirmer par écrit le transport et le délai pour cette destination.',
      ),
      s(
        'Describe exposure instead of choosing a cabinet by appearance',
        'Décrivez l’exposition avant de choisir l’armoire',
        'For a marina, recreation property or exterior access point, describe rain exposure, temperature conditions, power availability and how the device would be accessed. A cabinet alone does not establish that a device is suitable outdoors. Ask for the exact device and enclosure specifications to be reviewed together, including storage conditions when the property is unattended.',
        'Pour une marina, une propriété de loisirs ou un accès extérieur, décrivez l’exposition à la pluie, les températures, l’alimentation disponible et l’accès prévu à l’appareil. Une armoire ne rend pas à elle seule un DEA adapté à l’extérieur. Faites examiner ensemble les spécifications de l’appareil et de l’enceinte, y compris les conditions pendant les périodes sans surveillance.',
      ),
    ],
    checklist: [
      l(
        'Receiving address and any onward island or remote transfer',
        'Adresse de réception et transfert éventuel vers une île ou un lieu éloigné',
      ),
      l(
        'Loading, ferry or carrier constraints to verify',
        'Contraintes de quai, de traversier ou de transporteur à vérifier',
      ),
      l(
        'Indoor/outdoor exposure and available power',
        'Exposition intérieure ou extérieure et alimentation disponible',
      ),
      l(
        'Who checks the device when the site is unattended',
        'Personne chargée des vérifications en l’absence de personnel',
      ),
    ],
    faqs: [
      s(
        'Can a Vancouver quote cover an island property?',
        'Une soumission à Vancouver peut-elle inclure une propriété insulaire?',
        'Include both destinations and specify where responsibility for any onward transport changes. Freight and on-site services must be confirmed separately; a city quote does not establish island service availability.',
        'Indiquez les deux destinations et précisez qui assume chaque transfert. Le transport et les services sur place doivent être confirmés séparément; une soumission urbaine ne confirme pas la desserte d’une île.',
      ),
      s(
        'Is an exterior cabinet enough for an outdoor AED?',
        'Une armoire extérieure suffit-elle pour un DEA dehors?',
        'No. The exact device, enclosure, power and environmental limits must be checked together. Describe the intended exposure before requesting a configuration.',
        'Non. Il faut examiner ensemble l’appareil exact, l’enceinte, l’alimentation et les limites environnementales. Décrivez l’exposition prévue avant de demander une configuration.',
      ),
    ],
    children: ['vancouver'],
    related: ['cabinets', 'installation', 'hospitality'],
  },
  {
    id: 'alberta',
    code: 'AB',
    place: l('Alberta', 'Alberta'),
    parent: 'locations',
    intro: l(
      'Organise an Alberta AED request around offices, industrial premises or changing work sites. Separate fixed equipment locations, shift handovers and transport responsibilities.',
      'Organisez une demande de DEA en Alberta pour des bureaux, des installations industrielles ou des chantiers changeants. Distinguez les emplacements fixes, les relèves et le transport.',
    ),
    sections: [
      s(
        'Separate fixed premises from mobile equipment',
        'Distinguez les installations fixes de l’équipement mobile',
        'An office cabinet, a workshop and equipment moving between work sites need separate access and storage plans. Identify whether an AED will remain in an occupied building or travel with a crew. Give the proposed transport and storage conditions for review against the manufacturer’s instructions. Do not select a model solely because a carrying case is available.',
        'Une armoire de bureau, un atelier et un appareil déplacé entre chantiers nécessitent des plans d’accès et d’entreposage distincts. Précisez si le DEA restera dans un bâtiment occupé ou suivra une équipe. Décrivez le transport et l’entreposage pour les comparer aux instructions du fabricant. La présence d’un étui ne suffit pas à choisir un modèle.',
      ),
      s(
        'Make shift changes part of the plan',
        'Intégrez les changements de quart au plan',
        'For facilities with rotating staff or contractors, record who holds responsibility on each shift and how a concern reaches the next responsible person. Keep a simple device register with the exact model, location and supply-expiry information. An enquiry about maintenance is a starting point for agreeing a scope; it does not put the device under automatic monitoring.',
        'Dans une installation avec personnel en rotation ou sous-traitants, consignez le responsable de chaque quart et la transmission des problèmes à la relève. Tenez un registre simple indiquant le modèle exact, l’emplacement et les dates des fournitures. Une demande d’entretien sert à définir une portée; elle n’active pas une surveillance automatique de l’appareil.',
      ),
    ],
    checklist: [
      l(
        'Fixed location or crew transport, with storage conditions',
        'Emplacement fixe ou transport avec une équipe, avec conditions d’entreposage',
      ),
      l(
        'Site access, induction and receiving requirements',
        'Exigences d’accès, d’accueil et de réception du site',
      ),
      l(
        'Responsible contact for each shift or work location',
        'Contact responsable par quart ou lieu de travail',
      ),
      l(
        'Separate quantities for offices, workshops and remote projects',
        'Quantités distinctes pour les bureaux, ateliers et projets éloignés',
      ),
    ],
    faqs: [
      s(
        'Can equipment travel between work sites?',
        'L’équipement peut-il être déplacé entre chantiers?',
        'Describe that use in the enquiry. Suitability depends on the exact device, permitted storage and transport conditions, and the access plan at every destination.',
        'Décrivez cet usage dans la demande. Il faut vérifier l’appareil exact, les conditions d’entreposage et de transport permises, ainsi que le plan d’accès à chaque destination.',
      ),
      s(
        'How should we request support for rotating crews?',
        'Comment demander un accompagnement pour des équipes en rotation?',
        'List the shifts, site contacts and training needs. Ask for a clear handover and inspection scope, with technical servicing kept within qualified manufacturer-specific channels.',
        'Indiquez les quarts, les contacts et les besoins de formation. Demandez une portée claire pour la relève et les vérifications; les interventions techniques doivent suivre les voies qualifiées propres au fabricant.',
      ),
    ],
    children: ['calgary'],
    related: ['industrial', 'maintenance', 'training'],
  },
  {
    id: 'manitoba',
    code: 'MB',
    place: l('Manitoba', 'Manitoba'),
    parent: 'locations',
    intro: l(
      'Prepare a Manitoba AED brief for a Winnipeg receiving point, a community facility or a northern destination. Clarify onward delivery and continuity when local responsibilities change.',
      'Préparez un projet de DEA au Manitoba pour une réception à Winnipeg, un établissement communautaire ou une destination nordique. Précisez le transfert et la continuité des responsabilités.',
    ),
    sections: [
      s(
        'Distinguish the receiving depot from the final site',
        'Distinguez le dépôt de réception du lieu final',
        'If equipment is received in Winnipeg and then sent to another community, list both stages. Identify the carrier or local arrangement to confirm, who receives each handover and where the parcel will be held. Ask about supply transport requirements for the exact battery or device; do not assume every freight option accepts the same equipment.',
        'Si l’équipement est reçu à Winnipeg puis envoyé dans une autre communauté, décrivez les deux étapes. Identifiez le transporteur ou l’arrangement local à confirmer, les responsables de chaque transfert et le lieu d’attente du colis. Vérifiez les conditions de transport pour la batterie ou l’appareil exact; les options de fret ne sont pas nécessairement équivalentes.',
      ),
      s(
        'Keep community ownership of the record clear',
        'Définissez la responsabilité du registre communautaire',
        'For a recreation centre, school or community building, name a primary contact and a backup. Record who can obtain replacement supplies and who can update the access information when building hours change. Where the same people manage several buildings, keep the device register organised by physical location rather than by invoice alone.',
        'Pour un centre de loisirs, une école ou un bâtiment communautaire, désignez un contact principal et une relève. Indiquez qui peut obtenir les fournitures et mettre à jour les modalités d’accès lorsque les heures changent. Si une équipe gère plusieurs bâtiments, organisez le registre par emplacement physique plutôt que seulement par facture.',
      ),
    ],
    checklist: [
      l(
        'Final community and any Winnipeg receiving or transfer point',
        'Communauté finale et point de réception ou de transfert à Winnipeg',
      ),
      l(
        'Local receiving contact and backup',
        'Contact local à la réception et relève',
      ),
      l(
        'Transport requirements to check for the exact equipment',
        'Conditions de transport à vérifier pour l’équipement exact',
      ),
      l(
        'Building-hours record and replacement-supply owner',
        'Registre des heures d’accès et responsable des fournitures',
      ),
    ],
    faqs: [
      s(
        'Does delivery to a depot include onward transport?',
        'Une livraison au dépôt comprend-elle le transport suivant?',
        'Only if the written quote says so. Identify the final destination and ask which party arranges and accepts responsibility for each transfer.',
        'Seulement si la soumission écrite le prévoit. Indiquez la destination finale et demandez qui organise et assume chaque transfert.',
      ),
      s(
        'Can a community group request a readiness plan?',
        'Un groupe communautaire peut-il demander un plan de vérification?',
        'Yes. Provide the current device list, building hours and available local contacts. The agreed plan should identify records, supplies and responsibility for follow-up.',
        'Oui. Fournissez la liste des appareils, les heures d’ouverture et les contacts locaux. Le plan convenu devrait préciser les registres, les fournitures et les responsabilités de suivi.',
      ),
    ],
    related: ['municipalities', 'programs', 'maintenance'],
  },
  {
    id: 'saskatchewan',
    code: 'SK',
    place: l('Saskatchewan', 'Saskatchewan'),
    parent: 'locations',
    intro: l(
      'Plan an AED request for a Saskatchewan town facility, agricultural property or distributed work sites. Use precise receiving instructions and a practical local responsibility plan.',
      'Planifiez un DEA pour une installation municipale, une propriété agricole ou des lieux de travail dispersés en Saskatchewan. Précisez la réception et les responsabilités locales.',
    ),
    sections: [
      s(
        'Give a delivery location that can be confirmed',
        'Fournissez un lieu de livraison vérifiable',
        'For an agricultural or rural property, a business mailing address may differ from the receiving location. Supply the civic address or delivery directions accepted by the carrier, the receiving contact and times when someone is present. State whether the equipment will remain at a building or move with a crew so that storage and transport conditions can be reviewed.',
        'Pour une propriété agricole ou rurale, l’adresse postale peut différer du lieu de réception. Fournissez l’adresse municipale ou les indications acceptées par le transporteur, le contact et les heures de présence. Précisez si l’équipement restera dans un bâtiment ou suivra une équipe afin d’examiner l’entreposage et le transport.',
      ),
      s(
        'Match the register to the sites people actually use',
        'Reliez le registre aux lieux réellement utilisés',
        'A town office, recreation building and seasonal event space may share an administrator but have different key holders. Record each intended AED location, access hours and the person who checks it. If equipment is moved for an event, agree on the temporary record and return handover rather than leaving the normal location entry unchanged.',
        'Un bureau municipal, un centre de loisirs et un espace événementiel saisonnier peuvent partager une administration, mais avoir des détenteurs de clés différents. Consignez l’emplacement, les heures d’accès et le responsable de chaque DEA. Si un appareil est déplacé pour un événement, prévoyez une inscription temporaire et une relève au retour.',
      ),
    ],
    checklist: [
      l(
        'Carrier-ready receiving directions and occupied hours',
        'Indications acceptées par le transporteur et heures de présence',
      ),
      l(
        'Permanent and temporary equipment locations',
        'Emplacements permanents et temporaires des appareils',
      ),
      l(
        'Key holders at community or recreation facilities',
        'Détenteurs de clés des installations communautaires ou sportives',
      ),
      l(
        'Return handover for equipment used at events',
        'Relève au retour de l’équipement utilisé lors d’événements',
      ),
    ],
    faqs: [
      s(
        'Can several small facilities share one purchasing request?',
        'Plusieurs petites installations peuvent-elles regrouper leur demande?',
        'Yes. Provide a separate site list and explain any shared administration. Quantities, placements and service arrangements still need review for each facility.',
        'Oui. Fournissez une liste par lieu et précisez l’administration partagée. Les quantités, les emplacements et les modalités de service restent à examiner pour chaque installation.',
      ),
      s(
        'What if our mailing address is not the receiving point?',
        'Et si l’adresse postale n’est pas le lieu de réception?',
        'Include both and label them clearly. Confirm the carrier’s accepted delivery instructions before relying on a planned delivery date.',
        'Indiquez les deux en les identifiant clairement. Confirmez les indications acceptées par le transporteur avant de vous fier à une date de livraison prévue.',
      ),
    ],
    related: ['municipalities', 'industrial', 'care'],
  },
  {
    id: 'nb',
    code: 'NB',
    place: l('New Brunswick', 'Nouveau-Brunswick'),
    parent: 'locations',
    intro: l(
      'Prepare a New Brunswick AED project for bilingual teams, shared public spaces or properties with different operating hours. Specify language needs at the equipment and site level.',
      'Préparez un projet de DEA au Nouveau-Brunswick pour des équipes bilingues, des espaces partagés ou des propriétés aux horaires variés. Précisez les langues par appareil et par lieu.',
    ),
    sections: [
      s(
        'Define language needs for the people on site',
        'Définissez les besoins linguistiques sur place',
        'For a team working in English and French, record the preferred languages for device prompts, instructions and training separately. Ask how the exact model handles language selection rather than assuming all bilingual devices work the same way. Keep a named contact for reviewing the supplied documentation before the equipment is accepted.',
        'Pour une équipe travaillant en français et en anglais, précisez séparément les langues des messages, des instructions et de la formation. Demandez comment le modèle exact permet de choisir la langue; les appareils bilingues ne fonctionnent pas nécessairement tous de la même façon. Désignez un contact chargé d’examiner les documents avant la réception définitive.',
      ),
      s(
        'Distinguish public access from staff access',
        'Distinguez l’accès public de celui du personnel',
        'For a municipal office, community hall or shared commercial property, map the doors used by staff and visitors. A device behind a staff-only entrance may not be available during a public event. Describe evening and weekend use in the installation enquiry, and assign responsibility when one organisation hands the space to another.',
        'Dans un bureau municipal, une salle communautaire ou une propriété commerciale partagée, repérez les portes du personnel et des visiteurs. Un appareil derrière une entrée réservée au personnel pourrait être inaccessible pendant un événement public. Décrivez les usages de soir et de fin de semaine et attribuez les responsabilités lors du passage d’une organisation à une autre.',
      ),
    ],
    checklist: [
      l(
        'English/French prompts, documents and training preferences',
        'Préférences linguistiques pour les messages, documents et formations',
      ),
      l(
        'Doors used during public events and normal operations',
        'Portes utilisées lors des événements et des activités courantes',
      ),
      l(
        'Evening and weekend contact arrangements',
        'Contacts de soir et de fin de semaine',
      ),
      l(
        'Responsibility when a shared space changes users',
        'Responsabilité au changement d’utilisateurs d’un espace partagé',
      ),
    ],
    faqs: [
      s(
        'Can one enquiry include different language needs by site?',
        'Une demande peut-elle indiquer des langues différentes par lieu?',
        'Yes. List the language requirements beside each location and ask for confirmation against the exact device and training arrangements proposed.',
        'Oui. Inscrivez les besoins linguistiques à côté de chaque lieu et demandez une confirmation pour l’appareil exact et les modalités de formation proposés.',
      ),
      s(
        'What should an event venue include in its brief?',
        'Que doit préciser une salle événementielle?',
        'Include public entry points, event hours, key holders and who takes responsibility after the regular staff leave. Do not treat the office opening hours as the whole access plan.',
        'Indiquez les entrées publiques, les heures des événements, les détenteurs de clés et la relève après le départ du personnel habituel. Les heures du bureau ne constituent pas tout le plan d’accès.',
      ),
    ],
    related: ['training', 'municipalities', 'signage'],
  },
  {
    id: 'ns',
    code: 'NS',
    place: l('Nova Scotia', 'Nouvelle-Écosse'),
    parent: 'locations',
    intro: l(
      'Scope a Nova Scotia AED project for a visitor-facing business, recreation facility or seasonal coastal property. Plan for changing opening hours and equipment handovers.',
      'Précisez un projet de DEA en Nouvelle-Écosse pour une entreprise d’accueil, un centre de loisirs ou une propriété côtière saisonnière. Planifiez les horaires changeants et la relève.',
    ),
    sections: [
      s(
        'Keep the visitor access route understandable',
        'Rendez le trajet d’accès compréhensible aux visiteurs',
        'For accommodation, a visitor centre or a recreation building, describe the route from the public entrance to the proposed AED position. Staff familiarity with a back office is not a substitute for a clear visitor route. Include reception hours, locked doors and the person responsible for reviewing signage when the building layout changes.',
        'Dans un hébergement, un centre d’accueil ou un bâtiment de loisirs, décrivez le trajet entre l’entrée publique et le DEA prévu. La connaissance des bureaux par le personnel ne remplace pas un parcours clair pour les visiteurs. Précisez les heures de réception, les portes verrouillées et la personne chargée de revoir la signalisation si l’aménagement change.',
      ),
      s(
        'Prepare the seasonal handover',
        'Préparez la relève saisonnière',
        'If the property changes staff or closes for part of the year, keep the device record with the site rather than with one seasonal employee. Record its intended storage location, the responsible contact during closure and the reopening review. For coastal or exposed placements, describe moisture and environmental conditions for a device-and-cabinet review.',
        'Si la propriété change de personnel ou ferme une partie de l’année, conservez le registre avec le lieu plutôt qu’avec un seul employé saisonnier. Notez l’entreposage prévu, le responsable pendant la fermeture et la vérification à la réouverture. Pour un emplacement côtier ou exposé, décrivez l’humidité et les conditions à examiner pour l’appareil et l’armoire.',
      ),
    ],
    checklist: [
      l(
        'Visitor entrance and proposed device-access route',
        'Entrée des visiteurs et trajet prévu vers le DEA',
      ),
      l(
        'Reception hours and locked-door restrictions',
        'Heures de réception et restrictions des portes verrouillées',
      ),
      l(
        'Seasonal staff handover and reopening review',
        'Relève du personnel saisonnier et vérification à la réouverture',
      ),
      l(
        'Environmental exposure of the proposed placement',
        'Exposition environnementale de l’emplacement proposé',
      ),
    ],
    faqs: [
      s(
        'Can we plan for a property that closes seasonally?',
        'Peut-on planifier pour une propriété qui ferme selon la saison?',
        'Yes. Give the closure dates, storage arrangement and responsible contact. Ask for a plan covering closure and reopening, with storage conditions checked against the manufacturer’s instructions.',
        'Oui. Indiquez les dates de fermeture, l’entreposage et le contact responsable. Demandez un plan de fermeture et de réouverture respectant les conditions du fabricant.',
      ),
      s(
        'Should an AED be placed at reception?',
        'Faut-il placer le DEA à la réception?',
        'Reception is one option to assess, not an automatic choice. Confirm whether it stays accessible during all intended use hours and whether visitors can find it.',
        'La réception est une option à examiner, pas un choix automatique. Vérifiez l’accès pendant toutes les heures d’utilisation prévues et la facilité de repérage pour les visiteurs.',
      ),
    ],
    related: ['hospitality', 'signage', 'maintenance'],
  },
  {
    id: 'pei',
    code: 'PE',
    place: l('Prince Edward Island', 'Île-du-Prince-Édouard'),
    parent: 'locations',
    intro: l(
      'Plan an AED for a Prince Edward Island accommodation property, seasonal attraction or community building, with receiving dates and reopening checks agreed before equipment is ordered.',
      'Planifiez un DEA à l’Île-du-Prince-Édouard pour un hébergement, une attraction saisonnière ou un bâtiment communautaire, en précisant la réception et les vérifications à la réouverture.',
    ),
    sections: [
      s(
        'Order around occupied receiving dates',
        'Planifiez selon les dates de présence à la réception',
        'For a seasonal property, an available postal address does not mean someone can receive equipment there. Give the first staffed date, the person accepting the delivery and any alternate receiving location. Ask for a confirmed delivery arrangement before fixing an opening-day installation or training schedule; those are separate services with their own availability.',
        'Pour une propriété saisonnière, une adresse postale ne garantit pas la présence d’une personne à la réception. Indiquez la première date de présence, la personne qui acceptera le colis et toute autre adresse de réception. Faites confirmer la livraison avant de fixer l’installation ou la formation à l’ouverture; ces services ont leur propre disponibilité.',
      ),
      s(
        'Keep the opening checklist with the property',
        'Conservez la liste de réouverture avec la propriété',
        'Create a record of the device location, responsible operator, supplies and access arrangements before the property opens. Include a handover when managers or seasonal staff change. If equipment is stored elsewhere over winter, record where it goes and who confirms its return; use the exact manufacturer guidance for storage and readiness checks.',
        'Avant l’ouverture, consignez l’emplacement, le responsable, les fournitures et les modalités d’accès. Prévoyez une relève lorsque la direction ou le personnel saisonnier change. Si l’équipement est entreposé ailleurs pendant l’hiver, notez sa destination et la personne qui confirme son retour; suivez les indications exactes du fabricant pour l’entreposage et les vérifications.',
      ),
    ],
    checklist: [
      l(
        'First staffed receiving date and alternate delivery address',
        'Première date de réception avec personnel et adresse de remplacement',
      ),
      l(
        'Opening and closing dates for the property',
        'Dates d’ouverture et de fermeture de la propriété',
      ),
      l(
        'Equipment location during the off-season',
        'Lieu d’entreposage hors saison',
      ),
      l(
        'Manager handover and training-coordination needs',
        'Relève de la direction et besoins de coordination de formation',
      ),
    ],
    faqs: [
      s(
        'Does an opening date guarantee equipment arrival?',
        'La date d’ouverture garantit-elle l’arrivée de l’équipement?',
        'No. Share the target date early, then confirm inventory, freight and any separate service appointment in writing before relying on that schedule.',
        'Non. Communiquez la date visée tôt, puis faites confirmer par écrit l’équipement, le transport et tout rendez-vous distinct avant de vous fier à l’échéancier.',
      ),
      s(
        'Can we use an off-season receiving address?',
        'Peut-on utiliser une adresse de réception hors saison?',
        'Include it along with the final installation address. Explain who transports the equipment onward and how it will be stored before the property opens.',
        'Indiquez cette adresse et celle de l’installation finale. Précisez qui transporte ensuite l’équipement et comment il sera entreposé avant l’ouverture.',
      ),
    ],
    related: ['hospitality', 'care', 'training'],
  },
  {
    id: 'nl',
    code: 'NL',
    place: l('Newfoundland and Labrador', 'Terre-Neuve-et-Labrador'),
    parent: 'locations',
    intro: l(
      'Prepare an AED request that distinguishes the Newfoundland or Labrador destination, the receiving route and replacement-supply planning for a community, workplace or household.',
      'Préparez une demande de DEA en précisant la destination à Terre-Neuve ou au Labrador, le trajet de réception et le suivi des fournitures pour votre communauté, travail ou résidence.',
    ),
    sections: [
      s(
        'Name the final community, not just the province',
        'Nommez la communauté finale, pas seulement la province',
        'An address in Newfoundland and a destination in Labrador may need different freight and receiving arrangements. Give the community, postal code, receiving contact and any transfer between carriers. If access is seasonal or a parcel must be collected elsewhere, describe that before a delivery option is selected. A province-wide enquiry does not establish a uniform delivery timetable.',
        'Une adresse à Terre-Neuve et une destination au Labrador peuvent demander des modalités de transport et de réception différentes. Précisez la communauté, le code postal, le contact et tout transfert entre transporteurs. Décrivez un accès saisonnier ou une collecte ailleurs avant de choisir la livraison. Une demande provinciale ne suppose pas un délai uniforme.',
      ),
      s(
        'Plan replacement supplies before they become urgent',
        'Planifiez les fournitures avant l’urgence',
        'Ask how the exact model’s replacement electrodes and batteries can be sourced for the final destination. Keep model and part information with the local device record, alongside the manufacturer’s inspection instructions and supply dates. Confirm freight and storage conditions for replacements as well as the first device shipment; technical repairs require the appropriate qualified channel.',
        'Demandez comment obtenir les électrodes et batteries compatibles avec le modèle exact à la destination finale. Conservez les renseignements sur les pièces dans le registre local, avec les instructions de vérification et les dates des fournitures. Confirmez le transport et l’entreposage des remplacements comme du premier appareil; les réparations techniques exigent une voie qualifiée appropriée.',
      ),
    ],
    checklist: [
      l(
        'Newfoundland or Labrador destination, community and postal code',
        'Destination à Terre-Neuve ou au Labrador, communauté et code postal',
      ),
      l(
        'Carrier transfers, collection point or seasonal access',
        'Transferts, point de collecte ou accès saisonnier',
      ),
      l(
        'Exact model and compatible replacement parts to verify',
        'Modèle exact et pièces compatibles à vérifier',
      ),
      l(
        'Local record owner and supply-ordering contact',
        'Responsable du registre local et des commandes de fournitures',
      ),
    ],
    faqs: [
      s(
        'Can you quote a destination outside a main centre?',
        'Peut-on demander une soumission hors d’un grand centre?',
        'Send the exact destination and receiving constraints for review. The quote must confirm the transport arrangement and any available on-site services for that location.',
        'Soumettez la destination exacte et ses contraintes de réception. La soumission doit confirmer le transport et les services sur place possibles pour ce lieu.',
      ),
      s(
        'Should replacement supplies be part of the first enquiry?',
        'Faut-il discuter des fournitures dès la première demande?',
        'Yes. Ask about exact compatibility, expiry information and the route for future replacements. Do not substitute parts based only on a similar name or appearance.',
        'Oui. Demandez la compatibilité exacte, les dates pertinentes et le mode d’approvisionnement futur. Ne substituez pas des pièces selon un nom ou une apparence semblable.',
      ),
    ],
    related: ['pads', 'batteries', 'maintenance'],
  },
  {
    id: 'yukon',
    code: 'YT',
    place: l('Yukon', 'Yukon'),
    parent: 'locations',
    intro: l(
      'Scope a Yukon AED project around the final community, transport conditions and who retains the equipment record when a work site or seasonal property changes staff.',
      'Précisez un projet de DEA au Yukon selon la communauté finale, le transport et la conservation du registre lors d’un changement de personnel sur un chantier ou une propriété saisonnière.',
    ),
    sections: [
      s(
        'Separate a Whitehorse handover from the final destination',
        'Distinguez une réception à Whitehorse de la destination finale',
        'If a shipment is collected in Whitehorse and transported onward, identify who arranges that leg and where the equipment will be kept along the way. Provide the final site, receiving period and any road or seasonal access constraints to verify. Storage in a vehicle or an unattended building must be checked against the exact device instructions.',
        'Si un envoi est récupéré à Whitehorse puis transporté ailleurs, identifiez le responsable de ce trajet et les lieux d’attente de l’équipement. Précisez le site final, la période de réception et les contraintes routières ou saisonnières à vérifier. L’entreposage dans un véhicule ou un bâtiment sans personnel doit être comparé aux instructions exactes de l’appareil.',
      ),
      s(
        'Plan for people moving between sites',
        'Prévoyez les changements de personnel entre lieux',
        'For a project crew, lodge or community facility, assign the record to a role as well as a person. Keep the device model, location and supply information available to the next contact. If the device moves, record the new location and who accepts responsibility rather than relying on the previous site’s inspection log.',
        'Pour une équipe de projet, un établissement d’hébergement ou une installation communautaire, attribuez le registre à un rôle autant qu’à une personne. Rendez le modèle, l’emplacement et les fournitures accessibles à la relève. Si l’appareil est déplacé, consignez le nouveau lieu et son responsable plutôt que de conserver uniquement l’ancien registre.',
      ),
    ],
    checklist: [
      l(
        'Final community and any Whitehorse collection arrangement',
        'Communauté finale et collecte éventuelle à Whitehorse',
      ),
      l(
        'Transport and interim storage conditions',
        'Conditions de transport et d’entreposage temporaire',
      ),
      l(
        'Receiving season and site access to verify',
        'Saison de réception et accès à vérifier',
      ),
      l(
        'Responsibility at staff or project handovers',
        'Responsabilités lors des relèves de personnel ou de projet',
      ),
    ],
    faqs: [
      s(
        'Can we collect equipment and transport it ourselves?',
        'Peut-on récupérer et transporter l’équipement nous-mêmes?',
        'Describe the plan before ordering. Confirm the handover point, permitted transport conditions and who is responsible after collection in the written arrangement.',
        'Décrivez le plan avant de commander. Confirmez par écrit le point de remise, les conditions de transport permises et la responsabilité après la collecte.',
      ),
      s(
        'Does a maintenance enquiry include remote monitoring?',
        'Une demande d’entretien comprend-elle une surveillance à distance?',
        'No. Ask for the actual check, record and follow-up scope. Automatic monitoring is not provided by submitting a form.',
        'Non. Demandez la portée réelle des vérifications, registres et suivis. L’envoi d’un formulaire n’active aucune surveillance automatique.',
      ),
    ],
    related: ['industrial', 'maintenance', 'care'],
  },
  {
    id: 'nwt',
    code: 'NT',
    place: l('Northwest Territories', 'Territoires du Nord-Ouest'),
    parent: 'locations',
    intro: l(
      'Plan an AED request for the Northwest Territories with a clear final destination, local receiving contact and agreed responsibilities for checks and replacement supplies.',
      'Planifiez un DEA aux Territoires du Nord-Ouest avec une destination finale précise, un contact local à la réception et des responsabilités convenues pour les vérifications et fournitures.',
    ),
    sections: [
      s(
        'Identify each handover in the delivery plan',
        'Identifiez chaque remise dans le plan de livraison',
        'A central purchasing office, a Yellowknife receiving point and the community where equipment will be used can be different places. List them separately and identify who arranges onward transport. Ask the selected carrier to confirm the route and any equipment-specific restrictions. Neither a mailing address nor a requested date confirms that the entire route is available.',
        'Le bureau des achats, un point de réception à Yellowknife et la communauté utilisatrice peuvent être distincts. Indiquez-les séparément et nommez le responsable du transport suivant. Faites confirmer le trajet et les restrictions propres à l’équipement par le transporteur choisi. Une adresse postale ou une date demandée ne confirme pas la disponibilité de tout le trajet.',
      ),
      s(
        'Make the local follow-up workable',
        'Rendez le suivi local réalisable',
        'For a community building or a distributed project, nominate a local contact who can access the equipment and a backup who can use the same record. Agree how questions about device status or supplies will be escalated. Ask what can be handled through documentation and what would require a separately confirmed visit or qualified technical service.',
        'Pour un bâtiment communautaire ou un projet réparti, désignez un contact local ayant accès à l’appareil et une relève utilisant le même registre. Convenez du mode de transmission des questions sur l’état ou les fournitures. Distinguez les échanges documentaires d’une visite à confirmer séparément ou d’un service technique qualifié.',
      ),
    ],
    checklist: [
      l(
        'Purchasing, receiving and final-use locations',
        'Lieux d’achat, de réception et d’utilisation finale',
      ),
      l(
        'Onward carrier and transport restrictions to confirm',
        'Transporteur suivant et restrictions à confirmer',
      ),
      l(
        'Local contact, backup and shared device record',
        'Contact local, relève et registre partagé',
      ),
      l(
        'Separate scope for documentation support and visits',
        'Portées distinctes pour l’aide documentaire et les visites',
      ),
    ],
    faqs: [
      s(
        'Can a central office buy for several communities?',
        'Un bureau central peut-il acheter pour plusieurs communautés?',
        'Yes. Include a community-by-community receiving and responsibility list. Equipment, freight and service arrangements need confirmation for each destination.',
        'Oui. Joignez une liste de réception et de responsabilités par communauté. L’équipement, le transport et les services doivent être confirmés pour chaque destination.',
      ),
      s(
        'Can an enquiry establish on-site service availability?',
        'Une demande confirme-t-elle un service sur place?',
        'No. It starts a review. Ask the written quote to distinguish available site visits from remote coordination and manufacturer-specific technical support.',
        'Non. Elle lance un examen. Demandez que la soumission distingue les visites possibles, la coordination à distance et le soutien technique propre au fabricant.',
      ),
    ],
    related: ['municipalities', 'programs', 'batteries'],
  },
  {
    id: 'nunavut',
    code: 'NU',
    place: l('Nunavut', 'Nunavut'),
    parent: 'locations',
    intro: l(
      'Prepare a Nunavut AED project around community-specific freight, receiving contacts and language needs. Confirm transport and replacement-supply arrangements before committing to a schedule.',
      'Préparez un projet de DEA au Nunavut selon le transport propre à la communauté, les contacts et les langues souhaitées. Confirmez l’acheminement et les fournitures avant de fixer un échéancier.',
    ),
    sections: [
      s(
        'Start with the community and carrier arrangement',
        'Commencez par la communauté et le transporteur',
        'For a destination in Nunavut, provide the community, receiving organisation, contact and proposed freight arrangement. If the shipment will pass through another receiving point, identify the handover and storage plan. Ask the carrier about the exact device and battery before selecting a transport option; do not assume that a general parcel service covers the full route.',
        'Pour une destination au Nunavut, fournissez la communauté, l’organisation réceptrice, le contact et le transport envisagé. Si l’envoi passe par un autre point de réception, décrivez la remise et l’entreposage. Vérifiez l’appareil et la batterie exacts auprès du transporteur avant de choisir une option; un service de colis général ne couvre pas nécessairement tout le trajet.',
      ),
      s(
        'Discuss language and long-term local ownership',
        'Discutez des langues et de la responsabilité locale',
        'State the languages needed for staff communication, instructions and training. The website is English/French; additional language support must be discussed and confirmed, not assumed from the location. Keep the equipment and supply record with the receiving organisation, name a backup contact and plan how replacement parts will reach the community.',
        'Indiquez les langues souhaitées pour les échanges, les instructions et la formation. Le site est français-anglais; tout soutien linguistique supplémentaire doit être discuté et confirmé, sans le présumer selon le lieu. Conservez le registre des appareils et fournitures dans l’organisation, désignez une relève et planifiez l’arrivée des pièces de remplacement.',
      ),
    ],
    checklist: [
      l(
        'Community, receiving organisation and freight contact',
        'Communauté, organisation réceptrice et contact au transport',
      ),
      l(
        'Exact device/battery transport conditions to verify',
        'Conditions de transport de l’appareil et de la batterie à vérifier',
      ),
      l(
        'Language needs beyond the website’s English/French content',
        'Besoins linguistiques au-delà du contenu français-anglais du site',
      ),
      l(
        'Replacement-supply route and local backup contact',
        'Acheminement des fournitures et contact local de relève',
      ),
    ],
    faqs: [
      s(
        'Is freight to every community included?',
        'Le transport vers chaque communauté est-il compris?',
        'No standard freight inclusion is assumed. Supply the final destination so the carrier, handovers, costs and timing can be confirmed in the quote.',
        'Aucune inclusion uniforme du transport n’est présumée. Fournissez la destination finale afin de confirmer le transporteur, les remises, le coût et le délai dans la soumission.',
      ),
      s(
        'Can training be coordinated in another language?',
        'Peut-on coordonner une formation dans une autre langue?',
        'State the language and community in the request. Partner availability and the language of instruction must be verified before any training commitment.',
        'Précisez la langue et la communauté dans la demande. La disponibilité d’un partenaire et la langue d’enseignement doivent être vérifiées avant tout engagement de formation.',
      ),
    ],
    related: ['training', 'buying', 'pads'],
  },
  {
    id: 'toronto',
    code: 'ON',
    place: l('Toronto', 'Toronto'),
    parent: 'ontario',
    intro: l(
      'Turn a Toronto office, condominium or mixed-use building into a clear AED project brief: floors, controlled entrances, delivery access and responsibility between occupants.',
      'Préparez un projet de DEA pour un bureau, une copropriété ou un immeuble mixte à Toronto : étages, entrées contrôlées, réception et responsabilités entre occupants.',
    ),
    sections: [
      s(
        'Review the whole route through the building',
        'Examinez le trajet complet dans l’immeuble',
        'For a multi-floor property, show the proposed device position on a simple floor plan. Mark reception, secured doors, lift access and public areas so the building operator can review the route. Do not assume that a device in one lobby serves every tenant equally. Ask for the scope to consider actual access patterns rather than assigning a quantity from floor area alone.',
        'Dans un immeuble à plusieurs étages, indiquez le DEA prévu sur un plan simple. Repérez la réception, les portes contrôlées, les ascenseurs et les espaces publics pour permettre l’examen du trajet. Ne présumez pas qu’un appareil dans un hall dessert également tous les occupants. Examinez l’accès réel plutôt que de fixer la quantité uniquement selon la superficie.',
      ),
      s(
        'Coordinate receiving and mounting approvals',
        'Coordonnez réception et autorisation de fixation',
        'Tell us whether deliveries need a loading appointment, concierge acceptance or a specific entrance. Separately identify who can authorise mounting on a common-area wall and any work-hour restrictions. For several buildings under one manager, keep these instructions attached to each address so a shared quote does not lose the site-specific conditions.',
        'Précisez si la livraison exige un rendez-vous au quai, une réception par le concierge ou une entrée particulière. Identifiez séparément qui autorise la fixation dans un espace commun et les restrictions d’horaire. Pour plusieurs immeubles sous une même gestion, joignez ces indications à chaque adresse afin de préserver les conditions propres à chaque lieu.',
      ),
    ],
    checklist: [
      l(
        'Floor plan with controlled doors and proposed AED position',
        'Plan indiquant les portes contrôlées et le DEA prévu',
      ),
      l(
        'Concierge or loading appointment details',
        'Coordonnées du concierge ou rendez-vous au quai',
      ),
      l(
        'Common-area mounting approval and permitted work hours',
        'Autorisation de fixation et heures de travail permises',
      ),
      l(
        'Responsibility split between manager and tenants',
        'Partage des responsabilités entre gestionnaire et occupants',
      ),
    ],
    faqs: [
      s(
        'How many AEDs does a multi-floor building need?',
        'Combien de DEA faut-il dans un immeuble à plusieurs étages?',
        'A page cannot establish that number. Supply the layout, occupied areas, access restrictions and hours for a site-specific review with the responsible operator.',
        'Cette page ne peut pas fixer ce nombre. Fournissez le plan, les zones occupées, les restrictions et les horaires pour un examen propre au lieu avec le responsable.',
      ),
      s(
        'Can one tenant install in a shared lobby?',
        'Un occupant peut-il installer un DEA dans un hall partagé?',
        'Confirm permission with the property’s responsible authority. Include ownership, access, mounting and ongoing-check responsibilities in the proposed arrangement.',
        'Confirmez l’autorisation auprès du responsable de l’immeuble. Précisez la propriété, l’accès, la fixation et les responsabilités de vérification dans l’arrangement proposé.',
      ),
    ],
    related: ['properties', 'offices', 'installation'],
  },
  {
    id: 'montreal',
    code: 'QC',
    place: l('Montréal', 'Montréal'),
    parent: 'quebec',
    intro: l(
      'Prepare an AED project for a Montréal shared property or public-facing workplace, with French-language deliverables, separate entrances and clear approval responsibilities.',
      'Préparez un projet de DEA à Montréal pour une propriété partagée ou un milieu de travail accueillant du public, avec documents en français, entrées distinctes et autorisations claires.',
    ),
    sections: [
      s(
        'Map access for each group of occupants',
        'Repérez l’accès de chaque groupe d’occupants',
        'For a mixed residential and commercial property, distinguish resident entrances, public business entrances and any secured internal passages. Record when each route is open and who controls the keys or access system. A shared address does not establish shared access to an AED. Discuss the proposed placement with the property operator and the people responsible for its ongoing checks.',
        'Dans une propriété résidentielle et commerciale, distinguez les entrées des résidents, celles du public et les passages intérieurs contrôlés. Notez les heures de chaque trajet et qui gère les clés ou le système d’accès. Une adresse commune ne garantit pas l’accès partagé au DEA. Discutez de l’emplacement avec l’exploitant et les responsables des vérifications.',
      ),
      s(
        'Include French documents in the purchasing brief',
        'Incluez les documents français dans le dossier d’achat',
        'Ask for the device configuration, supplied instructions and training language to be identified in the quote. Keep these requirements visible when the purchasing contact and building manager are different people. For cabinet placement, note common-area approval, delivery access and permitted work hours so the language review and physical installation planning can proceed together.',
        'Demandez que la soumission précise la configuration, les instructions fournies et la langue de formation. Conservez ces exigences lorsque le contact aux achats et le gestionnaire sont distincts. Pour l’armoire, notez l’autorisation dans l’espace commun, l’accès de livraison et les heures permises afin de coordonner l’examen linguistique et l’installation.',
      ),
    ],
    checklist: [
      l(
        'Resident, staff and public entrances with opening hours',
        'Entrées des résidents, du personnel et du public, avec horaires',
      ),
      l(
        'French instructions and proposed device configuration',
        'Instructions françaises et configuration proposée',
      ),
      l(
        'Property decision-maker and ongoing-check contact',
        'Décideur immobilier et contact des vérifications',
      ),
      l(
        'Delivery access and common-area work permissions',
        'Accès de livraison et autorisations de travaux communs',
      ),
    ],
    faqs: [
      s(
        'Should the building manager review the quote?',
        'Le gestionnaire doit-il examiner la soumission?',
        'Yes, where they control placement, access or maintenance arrangements. Include the relevant decision-makers before treating a common-area location as approved.',
        'Oui, s’il contrôle l’emplacement, l’accès ou l’entretien. Faites participer les décideurs concernés avant de considérer un emplacement commun comme approuvé.',
      ),
      s(
        'Can residents and businesses share a device?',
        'Résidents et commerces peuvent-ils partager un appareil?',
        'That requires a review of actual access, responsibility and placement. Document the differences in opening hours and controlled doors before agreeing the arrangement.',
        'Il faut examiner l’accès réel, les responsabilités et l’emplacement. Consignez les différences d’horaire et les portes contrôlées avant de convenir des modalités.',
      ),
    ],
    related: ['properties', 'signage', 'training'],
  },
  {
    id: 'vancouver',
    code: 'BC',
    place: l('Vancouver', 'Vancouver'),
    parent: 'bc',
    intro: l(
      'Prepare a Vancouver AED brief for a strata property, workplace or visitor facility. Clarify shared-space permissions, secure-door access and the exact receiving address.',
      'Préparez un projet de DEA à Vancouver pour une copropriété, un lieu de travail ou un accueil de visiteurs. Précisez les autorisations, les portes contrôlées et l’adresse de réception.',
    ),
    sections: [
      s(
        'Separate common areas from restricted spaces',
        'Distinguez espaces communs et accès restreints',
        'For a strata or mixed-use property, identify which areas are accessible to residents, staff and visitors. Mark secured lobby doors, separate business entrances and any changes outside staffed hours. Confirm who can approve a cabinet on a common wall and who keeps the inspection record when the property manager or concierge team changes.',
        'Dans une copropriété ou un immeuble mixte, identifiez les zones accessibles aux résidents, au personnel et aux visiteurs. Repérez les halls contrôlés, les entrées commerciales et les changements hors des heures de présence. Confirmez qui autorise l’armoire sur un mur commun et qui conserve le registre lors d’un changement de gestionnaire ou de conciergerie.',
      ),
      s(
        'Do not let the city name stand in for a receiving address',
        'Ne remplacez pas l’adresse de réception par le nom de la ville',
        'Provide the actual building address and loading or concierge instructions. If a Vancouver office is purchasing for a different municipality, an island property or another BC site, list that as a separate destination. An equipment handover in the city and an onward installation are different scopes. Confirm each before combining them into a project timetable.',
        'Fournissez l’adresse réelle et les indications de quai ou de conciergerie. Si un bureau de Vancouver achète pour une autre municipalité, une île ou un autre lieu en Colombie-Britannique, indiquez une destination distincte. Une remise en ville et une installation ailleurs sont des portées différentes. Confirmez-les avant de fixer un échéancier commun.',
      ),
    ],
    checklist: [
      l(
        'Exact building address, loading access and receiving contact',
        'Adresse exacte, accès au quai et contact à la réception',
      ),
      l(
        'Strata or property approval for common-area mounting',
        'Autorisation de la copropriété ou du propriétaire pour la fixation',
      ),
      l(
        'After-hours access through controlled entrances',
        'Accès hors des heures habituelles par les entrées contrôlées',
      ),
      l(
        'Any destination beyond the Vancouver receiving point',
        'Toute destination au-delà du point de réception à Vancouver',
      ),
    ],
    faqs: [
      s(
        'Does this guide cover every Metro Vancouver address?',
        'Ce guide confirme-t-il la desserte de toutes les adresses métropolitaines?',
        'It is a city planning guide, not a service boundary. Give the exact municipality and address so delivery and any site services can be reviewed.',
        'Il s’agit d’un guide de planification, pas d’une limite de desserte. Fournissez la municipalité et l’adresse exactes pour examiner la livraison et les services sur place.',
      ),
      s(
        'What if the concierge is not always present?',
        'Et si le concierge n’est pas toujours présent?',
        'Describe the hours and the access route when the desk is unstaffed. Include the property operator in deciding a suitable location and responsibility for checks.',
        'Décrivez les heures et le trajet d’accès lorsque le poste est sans personnel. Faites participer l’exploitant au choix de l’emplacement et des responsabilités de vérification.',
      ),
    ],
    related: ['properties', 'offices', 'installation'],
  },
  {
    id: 'calgary',
    code: 'AB',
    place: l('Calgary', 'Calgary'),
    parent: 'alberta',
    intro: l(
      'Plan a Calgary AED project across an office, warehouse or contractor facility. Separate public entrances, secured work areas and equipment that travels to another site.',
      'Planifiez un DEA à Calgary pour un bureau, un entrepôt ou une installation d’entrepreneur. Distinguez les entrées publiques, les zones contrôlées et les appareils déplacés ailleurs.',
    ),
    sections: [
      s(
        'Review access between the office and the work floor',
        'Examinez l’accès entre les bureaux et l’atelier',
        'At a combined office and industrial property, a device accessible from reception may sit behind a locked door for warehouse staff. Record staff entrances, shift patterns and controlled passages between areas. Ask the site operator to review the proposed location against those routes, and identify who receives equipment without interrupting loading or work-floor operations.',
        'Dans une propriété combinant bureaux et activités industrielles, un appareil accessible par la réception peut être derrière une porte verrouillée pour l’entrepôt. Consignez les entrées du personnel, les quarts et les passages contrôlés. Faites examiner l’emplacement selon ces trajets et identifiez qui reçoit l’équipement sans perturber le quai ou l’atelier.',
      ),
      s(
        'Keep the Calgary base distinct from project destinations',
        'Distinguez la base de Calgary des lieux de projet',
        'If a Calgary office buys equipment for crews elsewhere, list the permanent base and final-use sites separately. Explain whether the AED will stay at a project or return with the crew, including transport and storage conditions. Agree on the person accepting each handover and the record that follows the device; a purchase at headquarters does not establish service availability at another site.',
        'Si un bureau de Calgary achète pour des équipes ailleurs, distinguez la base permanente des lieux d’utilisation. Précisez si le DEA restera sur un projet ou reviendra avec l’équipe, avec les conditions de transport et d’entreposage. Convenez des responsables de remise et du registre qui suit l’appareil; un achat au siège ne confirme pas la desserte d’un autre lieu.',
      ),
    ],
    checklist: [
      l(
        'Office, warehouse and secured work-area access routes',
        'Trajets d’accès aux bureaux, à l’entrepôt et aux zones contrôlées',
      ),
      l(
        'Shift contacts and receiving arrangements',
        'Contacts par quart et modalités de réception',
      ),
      l(
        'Equipment retained at the base versus sent to projects',
        'Équipement conservé à la base ou envoyé sur des projets',
      ),
      l(
        'Device record and responsibility at every handover',
        'Registre et responsabilité à chaque remise de l’appareil',
      ),
    ],
    faqs: [
      s(
        'Can one quote separate office and warehouse needs?',
        'Une soumission peut-elle distinguer les besoins du bureau et de l’entrepôt?',
        'Yes. Describe each area, its access restrictions and responsible contact. Ask for equipment and service items to be broken down by intended location.',
        'Oui. Décrivez chaque zone, ses restrictions et son responsable. Demandez une ventilation de l’équipement et des services selon l’emplacement prévu.',
      ),
      s(
        'Is a project outside Calgary part of the same service arrangement?',
        'Un projet hors de Calgary fait-il partie des mêmes modalités?',
        'Not automatically. Include the final project address and schedule for separate confirmation of freight, site access and any available service visits.',
        'Pas automatiquement. Fournissez l’adresse finale et l’échéancier du projet pour confirmer séparément le transport, l’accès et les visites possibles.',
      ),
    ],
    related: ['industrial', 'offices', 'programs'],
  },
];

const localSections = (
  sections: ReturnType<typeof s>[],
): Localized<Section[]> =>
  l(
    sections.map(({ heading, body }) => ({
      heading: heading.en,
      body: body.en,
    })),
    sections.map(({ heading, body }) => ({
      heading: heading.fr,
      body: body.fr,
    })),
  );
export const locationPages: DetailPage[] = locationGuides.map((guide) => ({
  id: guide.id,
  parent: guide.parent,
  kind: 'location',
  intro: guide.intro,
  sections: localSections(guide.sections),
  children: guide.children,
  related: guide.related,
  location: {
    code: guide.code,
    place: guide.place,
    checklist: l(
      guide.checklist.map((x) => x.en),
      guide.checklist.map((x) => x.fr),
    ),
    faqs: localSections(guide.faqs),
  },
}));
