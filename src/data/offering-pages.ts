import type { DetailPage } from './pages';
import type { OfferingId } from './offering-routes';
type Pair = [string, string];
type Topic = [string, string, string, string];
interface Brief {
  id: OfferingId;
  parent: DetailPage['parent'];
  intro: Pair;
  answer: Pair;
  topics: Topic[];
  checks: Pair[];
  faq: Topic[];
  related: NonNullable<DetailPage['related']>;
}
const philips = {
  label: 'Philips · HeartStart FRx documentation',
  url: 'https://www.usa.philips.com/healthcare/product/HC861304/heartstart-frx-automated-external-defibrillator',
};
const defibtech = {
  label: 'Defibtech · Lifeline VIEW specifications and support',
  url: 'https://www.defibtech.com/products/lifeline-view-aed/',
};
const briefs: Brief[] = [
  {
    id: 'siteAssessment',
    parent: 'installation',
    intro: [
      'Plan where an AED can be reached, stored and maintained. Prepare an access review for a workplace, shared building, home or multi-site project.',
      'Planifiez où le DEA sera accessible, rangé et suivi. Préparez un examen des accès pour le travail, un bâtiment partagé, une résidence ou plusieurs sites.',
    ],
    answer: [
      'An AED placement brief should cover occupied areas, access hours, controlled doors, storage conditions and the person responsible for checks. Confirm the location with the building operator before cabinet work.',
      'Une fiche d’emplacement doit couvrir zones occupées, horaires, portes contrôlées, entreposage et responsable des vérifications. Confirmez le lieu avec l’exploitant avant les travaux d’armoire.',
    ],
    topics: [
      [
        'What does the assessment need to establish?',
        'Que doit établir l’évaluation?',
        'Start with the people and spaces the AED is intended to serve. Trace access from occupied areas during normal hours, evenings and any shift changes. Record barriers such as controlled doors or separate floors. A central point on a drawing is not a complete placement decision; the proposed route must work when the building is actually in use.',
        'Commencez par les personnes et les espaces visés. Tracez les accès pendant les heures normales, en soirée et aux changements de quart. Notez portes contrôlées et étages séparés. Un point central sur un plan ne suffit pas; le trajet doit fonctionner pendant l’utilisation réelle du bâtiment.',
      ],
      [
        'What can be reviewed remotely?',
        'Que peut-on examiner à distance?',
        'A simple floor sketch, operating hours and non-sensitive photographs can support an initial discussion. Identify wall construction, device dimensions and available storage conditions. A remote review does not confirm hidden wall services, structural suitability or permission to drill; these must be resolved by the appropriate building and installation contacts.',
        'Un croquis simple, les horaires et des photos non sensibles peuvent soutenir une première discussion. Précisez mur, dimensions et entreposage. L’examen à distance ne confirme pas les conduites cachées, la structure ou le droit de percer; les responsables du bâtiment et de l’installation doivent les vérifier.',
      ],
      [
        'What should the written scope include?',
        'Que devrait préciser la portée écrite?',
        'Request a proposed location, access assumptions, cabinet and signage requirements, approval responsibilities and any unresolved site visit. Confirm whether the work is a planning discussion, a visit or an installation package. Service availability and the responsible provider are confirmed for your address before a commitment.',
        'Demandez emplacement proposé, hypothèses d’accès, armoire, signalisation, approbateurs et visite éventuelle. Confirmez s’il s’agit de planification, de visite ou d’installation. La disponibilité et le prestataire sont confirmés pour votre adresse avant tout engagement.',
      ],
    ],
    checks: [
      ['Floor sketch and occupied areas', 'Croquis et zones occupées'],
      [
        'Hours, locked doors and access owner',
        'Horaires, portes verrouillées et responsable',
      ],
      [
        'Proposed model and cabinet dimensions',
        'Modèle et dimensions d’armoire envisagés',
      ],
    ],
    faq: [
      [
        'Does an assessment certify legal compliance?',
        'L’évaluation certifie-t-elle la conformité légale?',
        'No. A planning enquiry is not a legal or engineering certification. Confirm applicable requirements with the relevant authority and qualified professionals for the site.',
        'Non. Une demande de planification n’est pas une certification juridique ou technique. Confirmez les exigences applicables avec l’autorité et les professionnels compétents.',
      ],
    ],
    related: ['cabinetMounting', 'signage', 'outdoorCabinets', 'locations'],
  },
  {
    id: 'cabinetMounting',
    parent: 'installation',
    intro: [
      'Prepare an AED wall-cabinet mounting enquiry with dimensions, wall details, access restrictions and building approval identified before work is arranged.',
      'Préparez une demande de fixation d’armoire de DEA avec dimensions, type de mur, restrictions d’accès et approbation du bâtiment avant les travaux.',
    ],
    answer: [
      'Cabinet mounting requires an approved location, a suitable mounting surface and clearance for the exact AED and case. Equipment supply, mounting labour, electrical work and signage should be separate quote items.',
      'La fixation exige un emplacement approuvé, une surface appropriée et un dégagement adapté au DEA et à son étui. Distinguez équipement, main-d’œuvre, électricité et signalisation dans la soumission.',
    ],
    topics: [
      [
        'Confirm the cabinet and device fit',
        'Confirmer les dimensions de l’armoire et du DEA',
        'Provide the AED model, carrying-case dimensions and the cabinet’s internal dimensions. Consider door swing and the ability to remove the device without obstruction. An existing cabinet may be reusable, but its condition, mounting and fit must be checked rather than assumed from the old equipment.',
        'Fournissez modèle, dimensions de l’étui et dimensions intérieures de l’armoire. Examinez l’ouverture de la porte et le retrait sans obstacle. Une armoire existante peut être réutilisable, mais son état, sa fixation et ses dimensions doivent être vérifiés.',
      ],
      [
        'Resolve permission and site conditions',
        'Régler les autorisations et conditions du lieu',
        'Identify the owner or manager who authorizes wall work. Describe the wall type, nearby services and any site induction or access restrictions. Recessed cabinets, powered enclosures and electrical connections may require separate qualified trades; do not treat them as an automatic part of a basic wall-mounting request.',
        'Identifiez le propriétaire ou gestionnaire autorisant les travaux. Décrivez mur, services voisins et restrictions d’accès. Les armoires encastrées, alimentées et les raccordements peuvent exiger des métiers qualifiés distincts; ils ne sont pas automatiquement inclus dans une fixation murale simple.',
      ],
      [
        'Plan the handover',
        'Planifier la remise',
        'Ask the confirmed provider to identify the completed location and any outstanding items. Update the device record and directional signage, and tell the responsible site team where the AED can be reached. A cabinet alarm is not a confirmed emergency-services connection; any monitoring feature must be specified separately.',
        'Demandez au prestataire confirmé d’identifier l’emplacement réalisé et les points restants. Actualisez registre et affichage et informez l’équipe de l’accès au DEA. Une alarme d’armoire ne constitue pas une connexion confirmée aux services d’urgence; toute surveillance doit être précisée séparément.',
      ],
    ],
    checks: [
      [
        'Internal cabinet and AED case dimensions',
        'Dimensions intérieures et dimensions de l’étui',
      ],
      ['Wall type and approval contact', 'Type de mur et approbateur'],
      [
        'Mounting, electrical and signage scope',
        'Portées de fixation, d’électricité et d’affichage',
      ],
    ],
    faq: [
      [
        'Does a cabinet alarm automatically call emergency services?',
        'L’alarme appelle-t-elle automatiquement les services d’urgence?',
        'Do not assume it does. Confirm the exact alarm and any separate communications or monitoring capability in the cabinet specification.',
        'Ne le présumez pas. Confirmez l’alarme exacte et toute fonction distincte de communication ou de surveillance dans les spécifications.',
      ],
    ],
    related: ['siteAssessment', 'cabinets', 'signage', 'locations'],
  },
  {
    id: 'readinessInspection',
    parent: 'maintenance',
    intro: [
      'Prepare a documented AED readiness-check scope covering access, visible condition, indicated status and model-specific supply records.',
      'Préparez une portée documentée de vérification du DEA : accès, état visible, indicateur et dossiers de fournitures propres au modèle.',
    ],
    answer: [
      'A readiness check documents the observations required by the exact device instructions and the agreed site scope. It does not replace technical repair, manufacturer servicing or a responsible person’s follow-up.',
      'Une vérification consigne les observations prévues par les instructions du DEA exact et la portée convenue. Elle ne remplace ni réparation, ni service du fabricant, ni suivi par un responsable.',
    ],
    topics: [
      [
        'Define what will be checked',
        'Définir les points à vérifier',
        'Identify the exact model and current instructions. Discuss access to the unit, cabinet condition, the manufacturer’s status indicator and recorded consumable dates. Set the check frequency from the manufacturer requirements and site policy, not a universal interval copied from a different model.',
        'Identifiez le modèle et les instructions actuelles. Examinez accès, armoire, indicateur du fabricant et dates consignées. Déterminez la fréquence selon les exigences du fabricant et la politique du lieu, pas selon un intervalle universel emprunté à un autre modèle.',
      ],
      [
        'Agree on a usable record',
        'Convenir d’un registre utile',
        'The record should identify the device and location, the date, the person performing the check, findings and required follow-up. Separate a completed observation from a resolved fault. Identify who can authorize replacement supplies and who confirms the corrective action, especially when purchasing and local operations are different teams.',
        'Le registre devrait identifier appareil, lieu, date, vérificateur, constats et suivi. Distinguez observation effectuée et défaillance résolue. Précisez qui autorise les fournitures et confirme l’action corrective, surtout si achats et exploitation relèvent d’équipes différentes.',
      ],
      [
        'Escalate faults through the correct channel',
        'Signaler les défaillances au bon service',
        'Use the manufacturer’s instructions and appropriate qualified service channel for device warnings, damage or faults. Do not open or attempt to repair an AED through a procurement checklist. The enquiry should state whether you need one-time checks, a recurring scope or help coordinating the next appropriate step.',
        'Suivez les instructions et le service qualifié approprié en cas d’avertissement, de dommage ou de défaillance. Une liste d’achats n’autorise pas l’ouverture ou la réparation du DEA. Indiquez si vous demandez un contrôle ponctuel, un suivi récurrent ou la coordination de la prochaine étape.',
      ],
    ],
    checks: [
      [
        'Exact model and device-location record',
        'Modèle exact et dossier d’emplacement',
      ],
      [
        'Current instructions and existing check process',
        'Instructions actuelles et processus existant',
      ],
      [
        'Follow-up owner and requested frequency',
        'Responsable du suivi et fréquence souhaitée',
      ],
    ],
    faq: [
      [
        'Are replacement parts included in an inspection?',
        'Les pièces sont-elles incluses dans une vérification?',
        'Only if the written scope says so. Request inspection, consumables and any technical servicing as distinct items.',
        'Seulement si la portée écrite le prévoit. Demandez des postes distincts pour vérification, consommables et service technique.',
      ],
    ],
    related: ['expiryTracking', 'assetInventory', 'care', 'locations'],
  },
  {
    id: 'expiryTracking',
    parent: 'programs',
    intro: [
      'Organize AED pad and battery dates by device and location, with named owners and a clear replacement-approval process.',
      'Organisez les échéances des électrodes et batteries par DEA et emplacement, avec responsables désignés et processus d’approbation des remplacements.',
    ],
    answer: [
      'Track the dates and replacement instructions for each exact component. Assign someone to review the list, approve purchases and update the record after replacement. A reminder alone does not verify readiness.',
      'Suivez les dates et instructions de chaque composant exact. Désignez les responsables de l’examen, de l’achat et de la mise à jour après remplacement. Un rappel seul ne confirme pas l’état du DEA.',
    ],
    topics: [
      [
        'Build a component-level record',
        'Créer un dossier par composant',
        'List the site, AED model, component reference and printed expiry or replacement information. Record installation dates when the manufacturer requires them. Pads, batteries and combined packs can follow different rules; do not calculate every item’s due date from the device purchase date.',
        'Listez lieu, modèle, référence et information d’échéance ou de remplacement imprimée. Consignez la mise en place lorsque le fabricant l’exige. Électrodes, batteries et blocs combinés peuvent suivre des règles différentes; ne calculez pas tout depuis la date d’achat du DEA.',
      ],
      [
        'Connect reminders to an action owner',
        'Relier les rappels à un responsable',
        'Decide who reviews upcoming dates and who can approve the expenditure. Include a backup contact and allow for the confirmed supplier lead time. After a replacement, record the new reference and date and close the old action. The website does not silently enrol you in a reminder subscription.',
        'Déterminez qui examine les dates et autorise la dépense. Prévoyez une relève et le délai confirmé du fournisseur. Après remplacement, consignez référence et date nouvelles et clôturez l’action. Le site ne vous inscrit pas automatiquement à un abonnement de rappels.',
      ],
      [
        'Confirm the actual tracking service',
        'Confirmer le service de suivi réel',
        'An enquiry can request a one-time inventory cleanup or an ongoing tracking arrangement. Ask the written proposal to specify the reporting format, reminder responsibility, review interval and whether replacement supplies are included. No monitoring software or automatic renewal is implied by this planning page.',
        'La demande peut viser une mise à jour ponctuelle ou un suivi continu. Faites préciser format, responsabilité des rappels, fréquence d’examen et inclusion éventuelle des fournitures. Cette page n’implique ni logiciel de surveillance ni renouvellement automatique.',
      ],
    ],
    checks: [
      [
        'Printed component dates and exact references',
        'Dates imprimées et références exactes',
      ],
      [
        'Site owner, purchaser and backup',
        'Responsable local, acheteur et relève',
      ],
      [
        'Requested reporting and reminder scope',
        'Portée souhaitée des rapports et rappels',
      ],
    ],
    faq: [
      [
        'Do all AED batteries expire on the same schedule?',
        'Toutes les batteries de DEA suivent-elles la même échéance?',
        'No. Use the exact battery and device instructions, including any installation-date requirements. Do not transfer another model’s interval.',
        'Non. Utilisez les instructions de la batterie et du DEA exacts, y compris les exigences de date de mise en place. N’empruntez pas l’intervalle d’un autre modèle.',
      ],
    ],
    related: ['assetInventory', 'batteries', 'adultPads', 'locations'],
  },
  {
    id: 'postUse',
    parent: 'maintenance',
    intro: [
      'Coordinate model-specific AED supplies and the appropriate follow-up after use. Keep patient details and incident records out of the quote form.',
      'Coordonnez les fournitures propres au DEA et le suivi approprié après utilisation. Excluez les renseignements de patients et d’incidents du formulaire de soumission.',
    ],
    answer: [
      'After use, follow the exact manufacturer return-to-readiness instructions and your organization’s procedure. A replenishment enquiry can identify compatible supplies; it cannot certify the device is ready for another use.',
      'Après utilisation, suivez les instructions du fabricant et la procédure de votre organisation. La demande peut identifier les fournitures compatibles; elle ne certifie pas que le DEA est prêt à être réutilisé.',
    ],
    topics: [
      [
        'Send equipment information only',
        'Envoyer uniquement les renseignements d’équipement',
        'Provide the model, consumable part references, quantity and final delivery location. State that supplies are needed after use without including patient names, medical observations or device event files. If the device shows a warning or damage, use the appropriate manufacturer or qualified service route rather than relying on a parts order.',
        'Indiquez modèle, références, quantité et lieu de livraison. Précisez que les fournitures suivent une utilisation sans nom de patient, observation médicale ou fichier d’événement. En cas d’avertissement ou de dommage, utilisez le service du fabricant ou le service qualifié plutôt qu’une simple commande.',
      ],
      [
        'Separate supplies from technical follow-up',
        'Distinguer fournitures et suivi technique',
        'The needed items depend on the exact system and what its instructions require. Some devices use separate consumables and others use a combined pack. Confirm the proposed parts and any necessary servicing before agreeing to the scope. Cleaning, data handling and device release follow the manufacturer and organization procedures, not this procurement page.',
        'Les articles nécessaires dépendent du système exact et de ses instructions. Certains appareils ont des consommables séparés, d’autres un bloc combiné. Confirmez pièces et service requis avant d’accepter. Nettoyage, données et remise en service relèvent des procédures du fabricant et de l’organisation.',
      ],
      [
        'Record the completed replenishment',
        'Consigner le réapprovisionnement réalisé',
        'Assign a person to receive supplies and document the new component references and dates. Close the equipment action only after the appropriate checks and follow-up have been completed. Ask separately about any temporary equipment arrangement; this website does not promise a loan unit, urgent dispatch or a free replacement program.',
        'Désignez une personne pour recevoir et consigner références et dates nouvelles. Clôturez l’action après les vérifications et suivis appropriés. Demandez séparément tout équipement temporaire; le site ne promet ni prêt, ni expédition urgente, ni programme de remplacement gratuit.',
      ],
    ],
    checks: [
      [
        'Model and used-supply references only',
        'Modèle et références des fournitures utilisées seulement',
      ],
      [
        'Delivery address and receiving role',
        'Adresse de livraison et rôle de réception',
      ],
      [
        'Technical follow-up owner if required',
        'Responsable du suivi technique au besoin',
      ],
    ],
    faq: [
      [
        'Can I send patient or event data with the enquiry?',
        'Puis-je joindre des données de patient ou d’événement?',
        'No. This is an equipment enquiry channel. Follow your organization’s authorized process for medical and device-event records.',
        'Non. Il s’agit d’un canal de demande d’équipement. Suivez le processus autorisé de votre organisation pour les dossiers médicaux et les événements du DEA.',
      ],
    ],
    related: ['parts', 'padBatteryPacks', 'readinessInspection', 'locations'],
  },
  {
    id: 'assetInventory',
    parent: 'programs',
    intro: [
      'Build an AED inventory that connects every device to its location, compatible supplies, check owner and replacement purchasing process.',
      'Constituez un inventaire qui relie chaque DEA à son emplacement, ses fournitures compatibles, son responsable et son processus d’achat de rechanges.',
    ],
    answer: [
      'Use one record per AED, even when several locations share a purchasing account. Track exact model, location, component references, dates and responsible roles. Keep patient and incident data in their separate authorized systems.',
      'Utilisez un dossier par DEA même si plusieurs lieux partagent un compte d’achat. Suivez modèle, emplacement, références, dates et rôles responsables. Gardez les données médicales dans leurs systèmes autorisés distincts.',
    ],
    topics: [
      [
        'Start with an equipment register',
        'Commencer par un registre d’équipement',
        'Assign a stable internal asset identifier and link it to the current site, building and cabinet location. Record the exact model, current supplies and manufacturer instructions. Avoid storing passwords, patient data or unnecessary personal information in the inventory or in an enquiry attachment.',
        'Attribuez un identifiant interne stable lié au lieu, au bâtiment et à l’armoire actuels. Consignez modèle, fournitures et instructions. Évitez mots de passe, données de patients et renseignements personnels inutiles dans l’inventaire ou une pièce jointe.',
      ],
      [
        'Map local work to central purchasing',
        'Relier le suivi local aux achats centraux',
        'Identify the role performing checks at each site, the person reviewing unresolved actions and the purchasing approver. For mobile devices, update assignments at handover. Group replacement orders only after compatibility checks; one brand across a portfolio can still contain several incompatible models and supply systems.',
        'Identifiez les rôles de vérification, d’examen des actions ouvertes et d’approbation des achats. Pour les DEA mobiles, actualisez l’affectation à la remise. Regroupez les commandes après vérification; une même marque peut comprendre plusieurs modèles et systèmes incompatibles.',
      ],
      [
        'Specify the deliverable before starting',
        'Préciser le livrable avant de commencer',
        'Ask whether the proposal covers an initial inventory, a record review, site visits or ongoing reporting. Agree on the format, access responsibilities and update process. This page does not imply a live cloud dashboard, automatic remote monitoring or a subscription; those capabilities must be separately confirmed if requested.',
        'Demandez si la proposition couvre inventaire initial, examen documentaire, visites ou rapports continus. Convenez du format, des responsabilités d’accès et des mises à jour. Cette page n’implique ni tableau de bord infonuagique, ni surveillance automatique, ni abonnement; ces capacités doivent être confirmées séparément.',
      ],
    ],
    checks: [
      [
        'One row per device and current location',
        'Une ligne par appareil et emplacement actuel',
      ],
      [
        'Exact models, supplies and dates',
        'Modèles exacts, fournitures et dates',
      ],
      [
        'Local owner, reviewer and purchaser roles',
        'Rôles locaux, d’examen et d’achat',
      ],
    ],
    faq: [
      [
        'Do I need the same model at every site?',
        'Faut-il le même modèle partout?',
        'Not necessarily. A mixed inventory can be documented, but each device needs its own compatible supplies and instructions. Confirm any standardization proposal before replacing equipment.',
        'Pas nécessairement. Un inventaire mixte peut être documenté, mais chaque DEA demande ses fournitures et instructions. Confirmez toute proposition d’uniformisation avant de remplacer l’équipement.',
      ],
    ],
    related: ['expiryTracking', 'programs', 'parts', 'locations'],
  },
  {
    id: 'adultPads',
    parent: 'pads',
    intro: [
      'Request adult AED electrode pads by exact device model and part reference. Confirm compatibility, package contents and remaining shelf life before ordering.',
      'Demandez des électrodes adultes par modèle exact et référence. Confirmez compatibilité, contenu et durée de conservation restante avant de commander.',
    ],
    answer: [
      'Adult replacement pads are model-specific. Match the exact AED and manufacturer part reference, then confirm the supplied configuration, quantity and expiry information in the quote.',
      'Les électrodes adultes sont propres au modèle. Faites correspondre DEA exact et référence du fabricant, puis confirmez configuration, quantité et information d’échéance dans la soumission.',
    ],
    topics: [
      [
        'Identify the device and current supply',
        'Identifier l’appareil et la fourniture actuelle',
        'Use the model printed on the AED and the reference on the current packaging. Similar connectors or a shared brand do not establish compatibility. If the reference is difficult to read, a clear equipment-label photograph can help; avoid including patient information or unrelated personal details.',
        'Utilisez le modèle inscrit sur le DEA et la référence de l’emballage. Un connecteur semblable ou une même marque ne prouve pas la compatibilité. Une photo nette de l’étiquette peut aider si la référence est difficile à lire; excluez les données de patient et renseignements personnels inutiles.',
      ],
      [
        'Confirm contents and expiry information',
        'Confirmer le contenu et les dates',
        'Ask whether the quoted item is the required electrode set or a larger consumable assembly, and whether any cable or accessory is included. Confirm remaining shelf life and storage instructions for the exact supply. Keep original packaging information with the device record so the next replacement does not start from a generic description.',
        'Demandez si l’article est le jeu d’électrodes requis ou un ensemble plus large et si câble ou accessoire est inclus. Confirmez durée restante et entreposage. Gardez les renseignements d’emballage au dossier pour éviter une description générique au prochain remplacement.',
      ],
      [
        'Separate rescue supplies from training supplies',
        'Séparer intervention et formation',
        'Training electrodes and rescue electrodes have different intended uses. Describe whether the request is for an active AED, a trainer or both, and keep them labelled and stored separately. Follow the exact device instructions for replacement; this page is a procurement guide, not instructions for treating a patient.',
        'Les électrodes de formation et d’intervention ont des usages distincts. Précisez si la demande vise un DEA, un simulateur ou les deux; identifiez et séparez les fournitures. Suivez les instructions exactes pour le remplacement; cette page guide l’achat, pas le traitement d’un patient.',
      ],
    ],
    checks: [
      [
        'Exact AED model and current pad reference',
        'Modèle exact et référence actuelle des électrodes',
      ],
      [
        'Quantity and final delivery city',
        'Quantité et ville de livraison finale',
      ],
      ['Requested expiry information', 'Information d’échéance demandée'],
    ],
    faq: [
      [
        'Are adult pads interchangeable across AEDs?',
        'Les électrodes adultes sont-elles interchangeables entre DEA?',
        'Do not assume interchangeability. Confirm the exact compatible part using the manufacturer’s documentation and the supplier’s written specification.',
        'Ne présumez pas l’interchangeabilité. Confirmez la pièce exacte avec la documentation du fabricant et la spécification écrite du fournisseur.',
      ],
    ],
    related: ['paediatricPads', 'padBatteryPacks', 'parts', 'expiryTracking'],
  },
  {
    id: 'paediatricPads',
    parent: 'pads',
    intro: [
      'Compare the child-use accessories required by your exact AED: dedicated paediatric pads, a key or a model-specific configuration.',
      'Comparez les accessoires pédiatriques requis par votre DEA exact : électrodes dédiées, clé ou configuration propre au modèle.',
    ],
    answer: [
      'Child-use configurations vary by AED. Some systems use dedicated paediatric electrodes; others use a manufacturer-specified key or mode with compatible pads. Confirm the exact configuration and instructions before purchasing.',
      'La configuration pédiatrique varie selon le DEA. Certains utilisent des électrodes dédiées; d’autres une clé ou un mode avec électrodes compatibles. Confirmez configuration et instructions exactes avant achat.',
    ],
    topics: [
      [
        'Start with the exact model',
        'Commencer par le modèle exact',
        'Do not choose paediatric supplies by the size or colour of an electrode illustration. Identify the AED model and review the manufacturer’s child-use configuration. For example, Philips describes an optional infant/child key for the FRx; this is a model-specific example, not a feature shared by every AED.',
        'Ne choisissez pas selon la taille ou la couleur d’une illustration. Identifiez le modèle et examinez sa configuration pédiatrique. Philips décrit par exemple une clé nourrisson/enfant optionnelle pour le FRx; il s’agit d’un exemple propre à ce modèle, pas d’une fonction de tous les DEA.',
      ],
      [
        'Ask what must be included',
        'Demander les éléments nécessaires',
        'Request the precise accessory reference, compatible pad set, instructions and any storage or expiry requirements. Specify that the site includes children when describing equipment needs. The age or weight indications and use procedure must come from the current instructions for the exact device and accessory, not from a generic buying guide.',
        'Demandez référence précise, électrodes compatibles, instructions et exigences d’entreposage ou d’échéance. Mentionnez la présence d’enfants dans les besoins. Les indications d’âge ou de poids et la procédure proviennent des instructions actuelles de l’appareil et de l’accessoire exacts.',
      ],
      [
        'Plan storage and staff orientation together',
        'Planifier rangement et orientation ensemble',
        'Record where the child-use accessory stays with the AED and include it in the site’s agreed inventory and check process. Ask separately about suitable training coordination. An accessory purchase does not by itself include training, certification or confirmation that the entire site’s preparedness requirements are met.',
        'Consignez où l’accessoire pédiatrique est conservé avec le DEA et intégrez-le à l’inventaire et aux vérifications convenus. Demandez la formation séparément. L’achat seul n’inclut ni formation, ni certification, ni confirmation que tous les besoins de préparation du lieu sont satisfaits.',
      ],
    ],
    checks: [
      [
        'Exact AED model and child-use configuration',
        'Modèle exact et configuration pédiatrique',
      ],
      [
        'Current accessory and pad references',
        'Références actuelles de l’accessoire et des électrodes',
      ],
      [
        'Quantity, storage and orientation needs',
        'Quantité, rangement et besoins d’orientation',
      ],
    ],
    faq: [
      [
        'Does every AED need separate child pads?',
        'Tous les DEA exigent-ils des électrodes pédiatriques distinctes?',
        'No single answer applies to every model. Check whether the manufacturer specifies dedicated pads, a key, a mode or another configuration for the exact AED.',
        'Aucune réponse unique ne vaut pour tous. Vérifiez si le fabricant prévoit électrodes dédiées, clé, mode ou autre configuration pour le DEA exact.',
      ],
    ],
    related: ['frx', 'adultPads', 'training', 'schools'],
  },
  {
    id: 'padBatteryPacks',
    parent: 'batteries',
    intro: [
      'Request a combined AED pad-and-battery pack or a coordinated replacement set, with the exact device and component configuration confirmed first.',
      'Demandez un bloc combiné d’électrodes et batterie ou un ensemble de remplacement coordonné, après confirmation du DEA et des composants exacts.',
    ],
    answer: [
      'A combined consumable pack is different from buying separate pads and a battery together. Identify which system your exact AED uses, then confirm the correct adult or child configuration and dates.',
      'Un bloc combiné diffère d’un achat conjoint d’électrodes et de batterie séparées. Identifiez le système du DEA exact, puis confirmez configuration adulte ou pédiatrique et dates.',
    ],
    topics: [
      [
        'Distinguish an integrated pack from a bundle',
        'Distinguer un bloc intégré d’un ensemble',
        'The phrase pads and battery can describe two separate items or a model-specific integrated consumable. Send the exact AED model and existing pack reference so the proposed replacement can be checked. Do not attempt to substitute a separate battery for a component that the manufacturer supplies as an integrated system.',
        'L’expression électrodes et batterie peut désigner deux articles ou un consommable intégré propre au modèle. Envoyez le modèle et la référence existante pour vérifier le remplacement. Ne substituez pas une batterie séparée à un composant fourni comme système intégré par le fabricant.',
      ],
      [
        'Confirm population and remaining life',
        'Confirmer l’usage prévu et la durée restante',
        'State whether the enquiry concerns adult-use supplies, a child-use configuration or training equipment. Ask for the exact part, included components, expiry information and storage conditions in writing. A package name or product image alone does not prove compatibility or indicate the dates on the supplied stock.',
        'Précisez usage adulte, configuration pédiatrique ou formation. Demandez par écrit pièce exacte, composants, dates et entreposage. Le nom d’un ensemble ou une image ne prouve ni compatibilité ni dates des articles fournis.',
      ],
      [
        'Update the entire device record',
        'Mettre à jour le dossier complet',
        'When coordinated replacements are received, record each installed component according to the manufacturer instructions. If the system uses a shared expiry, record the actual supplied date; if items have separate dates, retain them separately. Do not reset every interval to the date of an enquiry or invoice.',
        'À réception, consignez chaque composant installé selon les instructions. Si le système partage une échéance, notez la date réelle; si les dates diffèrent, gardez-les séparées. Ne réinitialisez pas tous les intervalles à la date de demande ou de facture.',
      ],
    ],
    checks: [
      [
        'Device and existing pack reference',
        'Références du DEA et du bloc existant',
      ],
      [
        'Integrated pack or separate-item request',
        'Bloc intégré ou articles distincts',
      ],
      [
        'Adult, child or training configuration',
        'Configuration adulte, pédiatrique ou de formation',
      ],
    ],
    faq: [
      [
        'Can pads and batteries be quoted together?',
        'Peut-on chiffrer électrodes et batterie ensemble?',
        'Yes. Identify the exact model and ask the quote to distinguish integrated packs from separate compatible items, with their actual expiry information.',
        'Oui. Identifiez le modèle exact et faites distinguer blocs intégrés et articles compatibles séparés, avec leurs dates réelles.',
      ],
    ],
    related: ['heartsine', 'parts', 'expiryTracking', 'postUse'],
  },
  {
    id: 'trainingDevices',
    parent: 'accessories',
    intro: [
      'Plan AED trainers, reusable training electrodes and supporting equipment for instruction, separately from rescue AEDs and their consumables.',
      'Planifiez simulateurs de DEA, électrodes de formation réutilisables et matériel pédagogique séparément des DEA d’intervention et de leurs consommables.',
    ],
    answer: [
      'A training device is intended for instruction and is not a replacement for a rescue AED. Match the trainer, accessories, language and course needs, and keep training equipment clearly identified.',
      'Un simulateur sert à l’enseignement et ne remplace pas un DEA d’intervention. Faites correspondre appareil, accessoires, langue et besoins du cours, en identifiant clairement le matériel de formation.',
    ],
    topics: [
      [
        'Describe the learning setup',
        'Décrire le contexte d’enseignement',
        'Tell us the intended course or orientation format, group size, instructor language and any AED model the trainer should resemble. Ask which scenarios, controls and accessories are supported by the specific trainer. A generic trainer name does not establish compatibility with a particular rescue model’s pads or controls.',
        'Indiquez format du cours ou de l’orientation, taille du groupe, langue et modèle à reproduire. Demandez les scénarios, commandes et accessoires du simulateur exact. Un nom générique ne prouve pas la compatibilité avec les électrodes ou commandes d’un DEA d’intervention.',
      ],
      [
        'Separate the training equipment list',
        'Distinguer la liste de matériel pédagogique',
        'Request the trainer, compatible reusable electrodes, cables, power supplies and any manikin-related requirements as individual items. Confirm which are included and which are optional. Keep training consumables labelled and separate from rescue supplies so they are not inadvertently placed in a live AED cabinet.',
        'Demandez séparément simulateur, électrodes réutilisables, câbles, alimentation et exigences liées aux mannequins. Confirmez les inclusions et options. Identifiez et séparez les consommables pédagogiques pour éviter qu’ils se retrouvent dans une armoire d’intervention.',
      ],
      [
        'Equipment purchase and course delivery are separate',
        'Achat de matériel et prestation du cours sont distincts',
        'If a course is also needed, request training coordination with the desired location, language, group size and course type. The provider, availability and any certification details must be confirmed in writing. Purchasing a trainer does not certify an instructor or establish that a course meets an employer’s requirements.',
        'Si un cours est requis, demandez sa coordination avec lieu, langue, taille du groupe et type. Prestataire, disponibilité et certification doivent être confirmés par écrit. L’achat d’un simulateur ne certifie pas un formateur et ne confirme pas les exigences d’un employeur.',
      ],
    ],
    checks: [
      [
        'Group size, language and training purpose',
        'Taille du groupe, langue et objectif',
      ],
      [
        'Trainer model and accessory list',
        'Modèle du simulateur et accessoires',
      ],
      [
        'Equipment-only or course-coordination scope',
        'Matériel seul ou coordination de cours',
      ],
    ],
    faq: [
      [
        'Can a trainer be used as an emergency AED?',
        'Un simulateur peut-il servir de DEA d’urgence?',
        'No. Training equipment is for instruction. Keep it clearly labelled and separate from the rescue AED and its compatible consumables.',
        'Non. Le matériel pédagogique sert à l’enseignement. Identifiez-le clairement et séparez-le du DEA d’intervention et de ses consommables.',
      ],
    ],
    related: ['training', 'paediatricPads', 'schools', 'locations'],
  },
  {
    id: 'carryCases',
    parent: 'accessories',
    intro: [
      'Request an AED carrying case matched to the exact device, intended transport and required accessory space, with cabinet clearance checked separately.',
      'Demandez un étui adapté au DEA exact, au transport et aux accessoires, en vérifiant séparément le dégagement dans l’armoire.',
    ],
    answer: [
      'Choose a case by the exact AED configuration and manufacturer compatibility. Confirm access to the device, accessory compartments and cabinet fit. A case alone does not control storage temperature or make outdoor storage suitable.',
      'Choisissez l’étui selon la configuration exacte et la compatibilité du fabricant. Confirmez accès, compartiments et dimensions d’armoire. Un étui seul ne contrôle pas la température et ne rend pas l’extérieur approprié.',
    ],
    topics: [
      [
        'Fit includes more than external dimensions',
        'Les dimensions extérieures ne suffisent pas',
        'Identify the device model and any attached or stored accessories. Ask whether the case permits the access and visibility required by the manufacturer instructions. If the unit stays in a cabinet, measure clearance with the case fitted rather than comparing only the bare AED dimensions.',
        'Identifiez modèle et accessoires fixés ou rangés. Demandez si l’étui permet l’accès et la visibilité prévus par les instructions. Si le DEA reste dans une armoire, mesurez le dégagement avec étui plutôt qu’avec l’appareil nu seulement.',
      ],
      [
        'Describe the intended movement',
        'Décrire les déplacements prévus',
        'A device carried between rooms, assigned to a vehicle or transferred between projects can have different storage and handover needs. State the intended use and review the actual transport limits. Do not treat a protective-looking case as evidence of waterproofing, temperature control or suitability for permanent vehicle storage.',
        'Les besoins diffèrent entre déplacement de salle, véhicule et transfert de projet. Précisez l’usage et examinez les limites réelles de transport. Un étui d’apparence protectrice ne prouve ni étanchéité, ni contrôle de température, ni aptitude à l’entreposage permanent dans un véhicule.',
      ],
      [
        'Record what travels with the AED',
        'Consigner ce qui accompagne le DEA',
        'List compatible spare supplies and any response kit that must travel with the unit. Confirm the available compartments and contents in the quote; a case photo does not promise included supplies. Keep the assigned location and responsible person current whenever the device moves.',
        'Listez fournitures compatibles et trousse devant accompagner l’appareil. Confirmez compartiments et contenu dans la soumission; une photo ne garantit pas les articles inclus. Actualisez emplacement et responsable à chaque déplacement.',
      ],
    ],
    checks: [
      [
        'Exact model and attached accessories',
        'Modèle exact et accessoires fixés',
      ],
      [
        'Cabinet internal dimensions if applicable',
        'Dimensions intérieures de l’armoire au besoin',
      ],
      [
        'Transport use and required contents',
        'Usage de transport et contenu requis',
      ],
    ],
    faq: [
      [
        'Does a case make an AED weatherproof?',
        'Un étui rend-il le DEA résistant aux intempéries?',
        'Do not assume that. Check the exact case specification and the AED’s storage and operating limits for the intended environment.',
        'Ne le présumez pas. Vérifiez les spécifications de l’étui et les limites d’entreposage et de fonctionnement du DEA pour l’environnement prévu.',
      ],
    ],
    related: ['cabinets', 'kits', 'packages', 'locations'],
  },
  {
    id: 'outdoorCabinets',
    parent: 'cabinets',
    intro: [
      'Prepare an outdoor AED enclosure brief covering device limits, weather exposure, power, access and building approvals before choosing a cabinet.',
      'Préparez une fiche d’armoire extérieure avec limites du DEA, exposition, alimentation, accès et autorisations avant de choisir l’équipement.',
    ],
    answer: [
      'Outdoor AED storage must be assessed for the exact device and enclosure. Water resistance alone is insufficient: review temperature limits, power, ventilation, exposure, access and the response to an enclosure fault.',
      'Le rangement extérieur doit être examiné pour le DEA et l’armoire exacts. L’étanchéité seule ne suffit pas : examinez température, alimentation, ventilation, exposition, accès et suivi des défaillances.',
    ],
    topics: [
      [
        'Define the actual environment',
        'Définir l’environnement réel',
        'Describe whether the site is exposed to sun, rain, snow, wind or condensation, and whether the proposed wall is sheltered. Compare the expected conditions with the exact AED and enclosure specifications. Avoid a broad claim that a cabinet works year-round everywhere in Canada; the site and supplied configuration determine the review.',
        'Décrivez exposition au soleil, à la pluie, à la neige, au vent ou à la condensation et protection du mur. Comparez les conditions prévues aux spécifications exactes. Évitez de présumer qu’une armoire convient partout au Canada toute l’année; le lieu et la configuration guident l’examen.',
      ],
      [
        'Resolve power and fault responsibility',
        'Régler l’alimentation et le suivi des défaillances',
        'If the enclosure requires heating or another powered function, identify electrical requirements and the qualified trade responsible. Ask what happens during a power loss or enclosure fault and who receives any alert. Do not assume an alarm provides remote monitoring or an automatic emergency-services call.',
        'Si l’armoire exige chauffage ou autre fonction alimentée, identifiez les besoins électriques et le métier qualifié responsable. Demandez les mesures en cas de panne et le destinataire des alertes. Ne présumez ni surveillance à distance ni appel automatique aux services d’urgence.',
      ],
      [
        'Quote enclosure, installation and access separately',
        'Chiffrer armoire, installation et accès séparément',
        'Request the cabinet specification, approved location, mounting, electrical work, signage and ongoing checks as distinct items. Confirm how the AED can be reached during intended access hours. Equipment availability and any site service remain subject to a written, address-specific scope; an outdoor enquiry is not a confirmed installation.',
        'Demandez spécifications, emplacement approuvé, fixation, électricité, affichage et suivi sur des postes distincts. Confirmez l’accès pendant les heures prévues. Disponibilité et services restent soumis à une portée écrite propre à l’adresse; la demande extérieure ne confirme pas une installation.',
      ],
    ],
    checks: [
      ['Exact AED and expected exposure', 'DEA exact et exposition prévue'],
      [
        'Power availability and qualified trade scope',
        'Alimentation disponible et métier qualifié',
      ],
      [
        'Access, fault reporting and ongoing owner',
        'Accès, signalement des pannes et responsable',
      ],
    ],
    faq: [
      [
        'Does an IP rating establish winter storage suitability?',
        'Un indice IP confirme-t-il l’entreposage hivernal?',
        'No. Review temperature limits and the entire enclosure and power arrangement for the site. An ingress-protection rating does not settle those requirements.',
        'Non. Examinez les limites de température et l’ensemble armoire-alimentation pour le lieu. L’indice de protection ne règle pas ces exigences.',
      ],
    ],
    related: ['siteAssessment', 'cabinetMounting', 'cabinets', 'locations'],
  },
];
const local = (values: Pair) => ({ en: values[0], fr: values[1] });
const sections = (topics: Topic[]) => ({
  en: topics.map(([heading, , body]) => ({ heading, body })),
  fr: topics.map(([, heading, , body]) => ({ heading, body })),
});
export const offeringPages: DetailPage[] = briefs.map((brief) => ({
  id: brief.id,
  parent: brief.parent,
  kind: 'guide',
  intro: local(brief.intro),
  sections: {
    en: [
      ...sections(brief.topics).en,
      {
        heading: 'Prepare your enquiry',
        body: 'Use this short equipment and site brief. Include no patient records, medical details or payment information.',
        bullets: brief.checks.map(([en]) => en),
      },
    ],
    fr: [
      ...sections(brief.topics).fr,
      {
        heading: 'Préparer votre demande',
        body: 'Utilisez cette courte fiche d’équipement et de lieu. N’incluez aucun dossier de patient, renseignement médical ou de paiement.',
        bullets: brief.checks.map(([, fr]) => fr),
      },
    ],
  },
  guide: {
    reviewed: '2026-11-07',
    summary: local(brief.answer),
    sources:
      brief.id === 'padBatteryPacks' || brief.id === 'postUse'
        ? [
            {
              label: 'HeartSine · Pad-Pak system reference',
              url: 'https://heartsine.com/product/heartsine-connected-samaritan-pad-350p/',
            },
            philips,
          ]
        : brief.id === 'trainingDevices'
          ? [
              {
                label: 'Defibtech · AED trainers',
                url: 'https://www.defibtech.com/products/aed-trainers/',
              },
              {
                label: 'Defibtech · Training accessories',
                url: 'https://www.defibtech.com/products/aed-training-accessories/',
              },
            ]
          : [philips, defibtech],
    faqs: sections(brief.faq),
  },
  related: brief.related,
}));
