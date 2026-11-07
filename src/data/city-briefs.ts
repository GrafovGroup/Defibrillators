// Original procurement scenarios. Local names identify the project area;
// these are not assertions about a particular facility, regulation or provider.
type Pair = readonly [string, string];
type Topic = readonly [string, string, string, string];
export interface CityBrief {
  intro: Pair;
  topics: readonly [Topic, Topic];
  checks: readonly [Pair, Pair, Pair];
  question: Pair;
  answer: Pair;
}
export const cityBriefs = {
  ottawa: {
    intro: [
      'Plan AED equipment and support for Ottawa–Gatineau. Separate Ontario and Québec addresses, device language needs and building access in one project brief.',
      'Planifiez l’équipement et le soutien en DEA à Ottawa–Gatineau. Distinguez les adresses ontariennes et québécoises, les langues et l’accès aux bâtiments.',
    ],
    topics: [
      [
        'A portfolio on both sides of the river',
        'Un parc immobilier des deux côtés de la rivière',
        'An Ottawa purchasing office may coordinate a Gatineau property without being its receiving contact. Keep a separate row for each province, delivery entrance and building operator. Ask for equipment, installation and training coordination to be priced by address; a shared budget does not make the operating requirements identical.',
        'Un bureau d’achats à Ottawa peut coordonner un immeuble à Gatineau sans y recevoir les livraisons. Préparez une ligne par province, entrée et exploitant. Demandez une ventilation de l’équipement, de l’installation et de la coordination des formations par adresse; un budget commun ne rend pas les besoins identiques.',
      ],
      [
        'Bilingual equipment and controlled entry',
        'Équipement bilingue et entrées contrôlées',
        'For a secured office, record visitor access separately from staff access. Confirm the exact language configuration offered for the AED, its prompts and its documentation. A bilingual website or wall sign does not establish that the selected device can switch languages. Include both languages in the written specification when needed.',
        'Dans un bureau sécurisé, distinguez l’accès des visiteurs de celui du personnel. Confirmez les langues offertes pour le DEA exact, ses messages et ses documents. Un site Web ou une affiche bilingue ne prouve pas que l’appareil peut changer de langue. Précisez les deux langues dans le devis au besoin.',
      ],
    ],
    checks: [
      [
        'Province for each Ottawa or Gatineau address',
        'Province de chaque adresse à Ottawa ou à Gatineau',
      ],
      [
        'Visitor entrance and security contact',
        'Entrée des visiteurs et contact à la sécurité',
      ],
      [
        'Required device and training languages',
        'Langues requises pour le DEA et la formation',
      ],
    ],
    question: [
      'Can Ottawa and Gatineau share one enquiry?',
      'Ottawa et Gatineau peuvent-elles figurer dans une demande?',
    ],
    answer: [
      'Yes. List both locations and their provinces, then request a separate scope for each. Leave the province undecided until you identify the actual delivery site.',
      'Oui. Indiquez les lieux et leur province, puis demandez une portée distincte pour chacun. Choisissez la province selon le lieu réel de livraison.',
    ],
  },
  edmonton: {
    intro: [
      'Prepare an Edmonton AED project for workplaces, distribution buildings and shared properties, with clear shift responsibility and indoor storage arrangements.',
      'Préparez un projet de DEA à Edmonton pour les milieux de travail, les bâtiments de distribution et les propriétés partagées, avec un suivi clair par quart.',
    ],
    topics: [
      [
        'Office and yard are separate access zones',
        'Le bureau et la cour ont des accès distincts',
        'For an Edmonton operation with an office, shop and outdoor yard, mark the doors between each zone. Check whether a unit behind reception can be reached after office staff leave. Describe the actual walking route and access restrictions before deciding whether one cabinet location fits the whole operation.',
        'Pour une entreprise d’Edmonton avec bureau, atelier et cour, repérez les portes entre chaque zone. Vérifiez si le DEA derrière la réception reste accessible après le départ du personnel administratif. Décrivez les trajets et les restrictions avant de retenir un seul emplacement pour l’ensemble.',
      ],
      [
        'Handover across shifts',
        'La relève entre les quarts',
        'Assign a named role to review the manufacturer status indicator and supply dates, with a backup for absences. If equipment moves to a project outside Edmonton, record that destination independently. Transport conditions, freight and any requested visit require a separate review; a city delivery quote does not cover every worksite.',
        'Attribuez à un rôle précis la vérification de l’indicateur du fabricant et des dates, avec une relève en cas d’absence. Si l’équipement part vers un projet hors d’Edmonton, consignez cette destination séparément. Le transport, l’expédition et les visites demandées doivent faire l’objet d’un examen distinct.',
      ],
    ],
    checks: [
      [
        'Office, shop and yard access sketch',
        'Croquis des accès au bureau, à l’atelier et à la cour',
      ],
      ['Shift owner and backup contact', 'Responsable de quart et remplaçant'],
      [
        'Final destination for mobile equipment',
        'Destination finale de l’équipement mobile',
      ],
    ],
    question: [
      'Can an AED stay in an unheated yard cabinet?',
      'Un DEA peut-il rester dans une armoire non chauffée?',
    ],
    answer: [
      'Do not assume so. Compare the exact device storage limits with the proposed enclosure and power arrangements before choosing an outdoor location.',
      'Ne le présumez pas. Comparez les limites d’entreposage de l’appareil exact avec l’armoire proposée et son alimentation avant de choisir un lieu extérieur.',
    ],
  },
  quebecCity: {
    intro: [
      'Plan an AED for Québec City or Lévis with French-language specifications, clear visitor access and a separate delivery brief for each building.',
      'Planifiez un DEA à Québec ou à Lévis avec des spécifications en français, un accès clair pour les visiteurs et une fiche de livraison par bâtiment.',
    ],
    topics: [
      [
        'Public rooms and private work areas',
        'Salles publiques et zones de travail privées',
        'For a Québec office or hospitality property, identify the areas used by guests and the rooms reserved for staff. A cabinet inside an administrative office may be inaccessible during evening activities. Record operating hours and access permissions before asking for a mounting proposal, especially where several tenants share an entrance.',
        'Dans un bureau ou un établissement d’accueil à Québec, distinguez les espaces des visiteurs des pièces réservées au personnel. Une armoire dans un bureau administratif peut être inaccessible en soirée. Notez les horaires et les permissions avant de demander une proposition de fixation, surtout si plusieurs occupants partagent l’entrée.',
      ],
      [
        'One specification, several receiving addresses',
        'Un devis, plusieurs adresses de réception',
        'When Québec and Lévis properties share purchasing, retain an individual receiving contact for each address. Specify French documentation and the device language configuration rather than relying on the catalogue title. Ask the written quote to distinguish the AED, compatible supplies, signage and any site work so each building can approve its own scope.',
        'Si des propriétés de Québec et de Lévis regroupent leurs achats, gardez un contact à la réception pour chaque adresse. Précisez les documents français et les langues de l’appareil au lieu de vous fier au titre du catalogue. Faites distinguer le DEA, les fournitures compatibles, la signalisation et les travaux pour chaque bâtiment.',
      ],
    ],
    checks: [
      [
        'French device and document requirements',
        'Exigences linguistiques de l’appareil et des documents',
      ],
      ['Evening and visitor access', 'Accès en soirée et accès des visiteurs'],
      [
        'Separate Québec and Lévis receiving contacts',
        'Contacts de réception distincts à Québec et à Lévis',
      ],
    ],
    question: [
      'Does French signage mean the AED speaks French?',
      'Une affiche en français signifie-t-elle que le DEA parle français?',
    ],
    answer: [
      'No. Confirm the exact voice-prompt configuration and supplied documentation separately from the signage.',
      'Non. Confirmez les messages vocaux du modèle exact et les documents fournis séparément de la signalisation.',
    ],
  },
  winnipeg: {
    intro: [
      'Prepare a Winnipeg AED enquiry for a workplace, community building or regional purchasing office. Distinguish local delivery from onward shipment.',
      'Préparez une demande de DEA à Winnipeg pour un lieu de travail, un bâtiment communautaire ou un bureau régional. Distinguez livraison locale et réexpédition.',
    ],
    topics: [
      [
        'A receiving hub is not the final site',
        'Le point de réception n’est pas toujours le lieu final',
        'If a Winnipeg office receives equipment for other Manitoba communities, provide both the receiving address and the final installation address. Label each device and accessory pack by destination before handover. Ask how onward freight, storage and arrival checks will be handled; an urban receiving appointment does not settle those details.',
        'Si un bureau de Winnipeg reçoit des appareils destinés à d’autres communautés manitobaines, indiquez l’adresse de réception et celle de l’installation finale. Identifiez chaque DEA et chaque ensemble par destination. Précisez la réexpédition, l’entreposage et les vérifications à l’arrivée; un rendez-vous en ville ne règle pas ces points.',
      ],
      [
        'Shared community schedules',
        'Des horaires communautaires partagés',
        'A recreation room, meeting space and office may use the same building at different times. Record who unlocks the AED area during each activity and who reviews the readiness log. For a seasonal closure, make storage and reopening responsibilities explicit instead of leaving the device assigned only to a building name.',
        'Une salle de loisirs, un espace de réunion et un bureau peuvent occuper le même bâtiment à des heures différentes. Notez qui ouvre la zone du DEA et qui examine le registre. En cas de fermeture saisonnière, attribuez clairement l’entreposage et la vérification à la réouverture.',
      ],
    ],
    checks: [
      [
        'Final address if Winnipeg is a receiving hub',
        'Adresse finale si Winnipeg sert de point de réception',
      ],
      [
        'Activity schedule and keyholder',
        'Horaire des activités et détenteur des clés',
      ],
      [
        'Handover and arrival-check responsibility',
        'Responsabilité de remise et de vérification à l’arrivée',
      ],
    ],
    question: [
      'Can a Winnipeg order include rural destinations?',
      'Une commande à Winnipeg peut-elle comprendre des destinations rurales?',
    ],
    answer: [
      'Include them in the enquiry, with final postal codes and receiving arrangements. Delivery and any site service must be confirmed individually.',
      'Ajoutez-les à la demande avec les codes postaux finaux et les modalités de réception. La livraison et les services sur place doivent être confirmés séparément.',
    ],
  },
  hamilton: {
    intro: [
      'Plan AED equipment for Hamilton and neighbouring properties with separate briefs for production floors, offices and public-facing areas.',
      'Planifiez l’équipement de DEA à Hamilton et dans les propriétés voisines avec des fiches distinctes pour la production, les bureaux et les espaces publics.',
    ],
    topics: [
      [
        'Production access versus reception access',
        'Accès à la production et à la réception',
        'For a Hamilton facility with secured production areas, describe how someone on the floor reaches the proposed AED. Include shift changes, locked doors and the reception closing time. A cabinet that is visible to visitors may still be separated from staff by access controls; review both routes before selecting its position.',
        'Dans une installation de Hamilton avec production sécurisée, décrivez le trajet vers le DEA proposé. Précisez les changements de quart, les portes verrouillées et la fermeture de la réception. Une armoire visible des visiteurs peut rester séparée du personnel par des contrôles d’accès; examinez les deux trajets.',
      ],
      [
        'Separate building and equipment approvals',
        'Distinguer l’approbation du bâtiment et de l’équipement',
        'In a leased workplace, identify who can approve drilling, cabinet dimensions and signage. For a portfolio including Burlington or Grimsby, keep these approvals with each address. Ask for model-compatible replacement supplies as a separate quote line, so the person approving wall work is not expected to validate electrode or battery compatibility.',
        'Dans un lieu loué, précisez qui approuve le perçage, les dimensions de l’armoire et la signalisation. Pour un parc comprenant Burlington ou Grimsby, conservez ces autorisations par adresse. Demandez les fournitures compatibles sur une ligne distincte; l’approbateur des travaux muraux ne valide pas nécessairement les électrodes.',
      ],
    ],
    checks: [
      ['Route from production floor to AED', 'Trajet de la production au DEA'],
      [
        'Landlord or facility approval contact',
        'Contact du propriétaire ou du gestionnaire',
      ],
      [
        'Receiving hours for each property',
        'Heures de réception de chaque propriété',
      ],
    ],
    question: [
      'Can cabinet mounting be quoted separately?',
      'Peut-on obtenir une soumission distincte pour la fixation?',
    ],
    answer: [
      'Yes. Provide the wall type, proposed location, access restrictions and approval contact. The installer and final scope still require confirmation.',
      'Oui. Indiquez le type de mur, l’emplacement, les restrictions et le contact approbateur. L’installateur et la portée finale restent à confirmer.',
    ],
  },
  waterloo: {
    intro: [
      'Coordinate AED planning across Kitchener, Cambridge and Waterloo with one inventory and a distinct access and receiving record for each address.',
      'Coordonnez les DEA à Kitchener, Cambridge et Waterloo avec un inventaire commun et des renseignements d’accès et de réception propres à chaque adresse.',
    ],
    topics: [
      [
        'Three cities, one accountable inventory',
        'Trois villes, un inventaire suivi',
        'A purchasing team covering Kitchener, Cambridge and Waterloo needs more than a total device count. Give every unit a site identifier, exact model and assigned owner. Group compatible supplies only after checking the model and part references; devices bought in different years may need different consumables even when their cases look similar.',
        'Une équipe d’achats couvrant Kitchener, Cambridge et Waterloo a besoin de plus qu’un nombre total de DEA. Attribuez un identifiant, un modèle exact et un responsable à chaque appareil. Regroupez les fournitures après vérification des références; des appareils d’années différentes peuvent utiliser des consommables distincts malgré une apparence semblable.',
      ],
      [
        'Shared workspaces and campus schedules',
        'Espaces partagés et horaires de campus',
        'For a shared office or education setting, document evening access and changes between terms or tenants. Identify whether the building owner or occupying organization maintains the AED record. Include the handover process when a lease or program ends, so the device does not become an unassigned item in a common room.',
        'Dans un bureau partagé ou un établissement d’enseignement, documentez l’accès en soirée et les changements de session ou de locataire. Déterminez si le propriétaire ou l’occupant tient le registre. Prévoyez la remise en fin de bail ou de programme afin que le DEA conserve un responsable.',
      ],
    ],
    checks: [
      [
        'City and site identifier for every device',
        'Ville et identifiant de lieu pour chaque appareil',
      ],
      [
        'Exact model and existing part references',
        'Modèle exact et références des pièces existantes',
      ],
      [
        'Tenant or term-change handover owner',
        'Responsable de la relève entre locataires ou sessions',
      ],
    ],
    question: [
      'Can all sites use the same replacement pads?',
      'Tous les lieux peuvent-ils utiliser les mêmes électrodes?',
    ],
    answer: [
      'Only when the exact models and approved part references match. Build the inventory first, then group compatible items in the quote.',
      'Seulement si les modèles exacts et les références approuvées correspondent. Constituez l’inventaire, puis regroupez les articles compatibles dans la soumission.',
    ],
  },
  london: {
    intro: [
      'Prepare an AED brief for London offices, education buildings and residential properties, including shared access and changes in occupancy.',
      'Préparez une fiche de DEA pour les bureaux, les bâtiments d’enseignement et les résidences à London, avec l’accès partagé et les changements d’occupation.',
    ],
    topics: [
      [
        'Separate public access from resident access',
        'Distinguer l’accès public de celui des résidents',
        'For a London apartment or shared education building, identify whether visitors, residents and staff can reach the same cabinet. Note reception hours and doors that change to card access at night. Ask the property operator to approve the location using actual access routes, rather than choosing it only because a wall has space.',
        'Dans un immeuble résidentiel ou d’enseignement à London, vérifiez si visiteurs, résidents et personnel peuvent atteindre la même armoire. Notez les heures de réception et les portes à carte en soirée. Faites approuver l’emplacement selon les trajets réels, plutôt que selon l’espace libre sur un mur.',
      ],
      [
        'Plan for turnover',
        'Prévoir les changements de responsables',
        'Student, tenant or staffing changes can leave a readiness log without an owner. Include the AED record in the building handover checklist, together with its model, supply dates and location. A replacement-supply enquiry should state whether the existing unit will remain in service and who will receive and record the new parts.',
        'Les changements d’étudiants, de locataires ou de personnel peuvent laisser un registre sans responsable. Ajoutez le dossier du DEA à la liste de relève du bâtiment, avec modèle, dates et emplacement. Pour des fournitures, précisez si l’appareil reste en service et qui recevra et consignera les pièces.',
      ],
    ],
    checks: [
      [
        'Resident, visitor and staff access hours',
        'Heures d’accès des résidents, visiteurs et employés',
      ],
      [
        'Record owner during occupancy changes',
        'Responsable du registre lors des changements d’occupation',
      ],
      [
        'Supply dates and receiving contact',
        'Dates des fournitures et contact à la réception',
      ],
    ],
    question: [
      'Should an AED be included in a property handover?',
      'Faut-il inclure le DEA dans la relève d’un immeuble?',
    ],
    answer: [
      'Yes. Transfer the location, device record, current supply dates and assigned follow-up responsibility with the building records.',
      'Oui. Transférez son emplacement, son dossier, les dates actuelles et la responsabilité de suivi avec les documents du bâtiment.',
    ],
  },
  halifax: {
    intro: [
      'Plan AED equipment for Halifax, Dartmouth and Bedford with clear building access, receiving instructions and accountability across waterfront or inland sites.',
      'Planifiez des DEA à Halifax, Dartmouth et Bedford en précisant l’accès, la réception et les responsabilités des différents lieux.',
    ],
    topics: [
      [
        'Keep each destination explicit',
        'Préciser chaque destination',
        'For properties in Halifax, Dartmouth and Bedford, use full addresses rather than a single regional label. Note whether a delivery goes to an office, loading entrance or separate receiving building. If one team purchases for several destinations, request labelled equipment groups and retain an individual contact for every handover.',
        'Pour des propriétés à Halifax, Dartmouth et Bedford, utilisez les adresses complètes plutôt qu’une seule étiquette régionale. Précisez si la livraison vise un bureau, un quai ou un bâtiment de réception distinct. Si les achats sont regroupés, demandez des ensembles identifiés et un contact pour chaque remise.',
      ],
      [
        'Wet entrances and seasonal public spaces',
        'Entrées humides et espaces publics saisonniers',
        'For a waterfront or recreation setting, describe splash exposure, condensation concerns and whether the proposed space is enclosed. Do not assume a standard indoor cabinet protects an AED outdoors. Separate enclosure selection from mounting work, and ask who remains responsible when seasonal visitor facilities close.',
        'Pour un lieu riverain ou de loisirs, décrivez les éclaboussures, la condensation possible et le caractère fermé du local. Ne supposez pas qu’une armoire intérieure protège un DEA dehors. Distinguez le choix de l’armoire des travaux de fixation et attribuez le suivi à la fermeture saisonnière.',
      ],
    ],
    checks: [
      [
        'Exact Halifax, Dartmouth or Bedford destination',
        'Destination exacte à Halifax, Dartmouth ou Bedford',
      ],
      [
        'Indoor enclosure and exposure description',
        'Description de l’abri et de l’exposition',
      ],
      [
        'Receiving and seasonal follow-up contacts',
        'Contacts de réception et de suivi saisonnier',
      ],
    ],
    question: [
      'Is an indoor cabinet suitable near an exposed entrance?',
      'Une armoire intérieure convient-elle près d’une entrée exposée?',
    ],
    answer: [
      'It depends on the actual exposure and device limits. Describe the conditions and request an enclosure review before selecting a cabinet.',
      'Cela dépend de l’exposition réelle et des limites du DEA. Décrivez les conditions et demandez un examen avant de choisir l’armoire.',
    ],
  },
  niagara: {
    intro: [
      'Plan AEDs across St. Catharines and Niagara properties with attention to seasonal staffing, visitor access and supplies assigned to each location.',
      'Planifiez des DEA à St. Catharines et dans la région de Niagara en tenant compte du personnel saisonnier, des visiteurs et des fournitures par lieu.',
    ],
    topics: [
      [
        'Visitor routes change with operating hours',
        'Les trajets des visiteurs changent selon l’horaire',
        'A Niagara hospitality or recreation property may open different entrances for daytime visitors, evening events and overnight guests. Document these routes separately and identify who can reach the AED when reception closes. Signage should lead to the actual device location; a sign at a locked seasonal entrance can be misleading.',
        'Un établissement d’accueil ou de loisirs de Niagara peut utiliser des entrées différentes le jour, en soirée et la nuit. Documentez ces trajets et déterminez qui atteint le DEA après la fermeture de la réception. La signalisation doit mener à l’appareil réel; une entrée saisonnière verrouillée peut induire en erreur.',
      ],
      [
        'Reopening is a planned handover',
        'La réouverture demande une relève organisée',
        'Before a seasonal facility reopens, assign someone to review the device record, indicator and consumable dates according to its manual. For St. Catharines, Niagara Falls or Welland destinations, list each property independently. A regional purchase can still need different cabinets, languages and staff orientation arrangements.',
        'Avant la réouverture, désignez une personne pour examiner le registre, l’indicateur et les dates selon le manuel. Pour St. Catharines, Niagara Falls ou Welland, inscrivez chaque propriété séparément. Un achat régional peut nécessiter des armoires, des langues et des modalités d’orientation différentes.',
      ],
    ],
    checks: [
      ['Visitor routes by time of day', 'Trajets des visiteurs selon l’heure'],
      [
        'Seasonal closure and reopening owner',
        'Responsable des fermetures et réouvertures',
      ],
      [
        'Individual property and receiving addresses',
        'Adresses de propriété et de réception distinctes',
      ],
    ],
    question: [
      'Can seasonal staff receive an AED orientation?',
      'Peut-on prévoir une orientation pour le personnel saisonnier?',
    ],
    answer: [
      'Include that need in the enquiry. Distinguish a site orientation from a formal CPR/AED course, whose provider and format must be confirmed.',
      'Incluez ce besoin dans la demande. Distinguez l’orientation sur place d’une formation RCR/DEA officielle, dont le fournisseur et le format restent à confirmer.',
    ],
  },
  windsor: {
    intro: [
      'Prepare a Windsor AED enquiry for production, logistics or public-facing premises. Confirm the Canadian device configuration and each shift’s access.',
      'Préparez une demande de DEA à Windsor pour la production, la logistique ou l’accueil du public. Confirmez la configuration canadienne et l’accès par quart.',
    ],
    topics: [
      [
        'Canadian procurement details matter',
        'Les détails d’approvisionnement canadien comptent',
        'For a Windsor purchasing team that also handles US sites, keep Canadian device and supply specifications distinct. A similarly named overseas model is not proof of Canadian licensing or part compatibility. Request the exact model, part numbers, documentation language and Canadian supply terms in the written equipment quote.',
        'Pour une équipe de Windsor qui achète aussi pour des lieux américains, gardez les spécifications canadiennes distinctes. Un modèle étranger au nom semblable ne prouve ni l’homologation canadienne ni la compatibilité. Demandez le modèle exact, les références, la langue documentaire et les modalités canadiennes par écrit.',
      ],
      [
        'Loading access is different from emergency access',
        'L’accès de livraison diffère de l’accès au DEA',
        'A delivery may arrive through a secured shipping office while the AED belongs in a staff or visitor area. Identify both routes in the project brief. For a shift-based facility, include who receives the cabinet, who approves mounting and who keeps the readiness record after the purchasing team closes the order.',
        'Une livraison peut passer par un bureau d’expédition sécurisé alors que le DEA est destiné au personnel ou aux visiteurs. Indiquez les deux trajets. Dans un établissement à quarts, précisez qui reçoit l’armoire, approuve la fixation et tient le registre après la clôture de la commande.',
      ],
    ],
    checks: [
      [
        'Canadian model and supply references',
        'Références canadiennes du modèle et des fournitures',
      ],
      [
        'Shipping entrance and intended AED location',
        'Entrée de livraison et emplacement du DEA',
      ],
      [
        'Contact for every operating shift',
        'Contact pour chaque quart de travail',
      ],
    ],
    question: [
      'Can a US product listing establish Canadian suitability?',
      'Une fiche américaine confirme-t-elle l’admissibilité au Canada?',
    ],
    answer: [
      'No. Verify the exact device in Health Canada’s applicable records and confirm the Canadian configuration with the supplier.',
      'Non. Vérifiez l’appareil exact dans les registres applicables de Santé Canada et confirmez la configuration canadienne avec le fournisseur.',
    ],
  },
  oshawa: {
    intro: [
      'Plan AED equipment for Oshawa, Whitby and Clarington properties with distinct building records, receiving contacts and staff access routes.',
      'Planifiez des DEA pour les propriétés d’Oshawa, de Whitby et de Clarington avec des dossiers, des contacts de réception et des trajets d’accès distincts.',
    ],
    topics: [
      [
        'Keep the municipal address with the device',
        'Conserver l’adresse municipale avec l’appareil',
        'An Oshawa procurement office may serve buildings in Whitby or Clarington. Put the final address on the device inventory and quote brief, not just the billing address. For multiple facilities, identify which cabinets remain in place and which need new mounting approvals before consolidating the purchase.',
        'Un bureau d’achats d’Oshawa peut desservir des bâtiments à Whitby ou à Clarington. Inscrivez l’adresse finale à l’inventaire et à la demande, pas seulement l’adresse de facturation. Pour plusieurs installations, précisez les armoires conservées et celles qui nécessitent une nouvelle autorisation de fixation.',
      ],
      [
        'Changing facilities need a new access review',
        'Les changements de locaux exigent un nouvel examen',
        'When a workplace adds a room, changes reception hours or moves a department, revisit the route to the AED. A previous cabinet decision may no longer suit the new layout. Record the revised floor location, responsible role and signage changes together so the inventory remains useful during everyday checks.',
        'Lorsqu’un lieu ajoute une salle, modifie l’accueil ou déplace un service, réexaminez le trajet vers le DEA. L’ancienne décision d’emplacement peut ne plus convenir. Consignez ensemble l’étage, le rôle responsable et les modifications d’affichage pour garder un inventaire utile aux vérifications.',
      ],
    ],
    checks: [
      [
        'Final municipality and street address',
        'Municipalité et adresse finales',
      ],
      [
        'Existing cabinet dimensions and condition',
        'Dimensions et état de l’armoire existante',
      ],
      [
        'Recent layout or operating-hour changes',
        'Changements récents de configuration ou d’horaire',
      ],
    ],
    question: [
      'Does moving an AED require updating the signs?',
      'Le déplacement du DEA exige-t-il de modifier les affiches?',
    ],
    answer: [
      'Review the route signs, location record and staff orientation whenever the device moves. Confirm mounting approval for the new position.',
      'Réexaminez la signalisation, le registre et l’orientation du personnel lors d’un déplacement. Confirmez l’autorisation de fixation au nouvel emplacement.',
    ],
  },
  victoria: {
    intro: [
      'Prepare an AED project for Victoria-area offices, accommodation and community premises, with island delivery details and clear public access.',
      'Préparez un projet de DEA pour les bureaux, les établissements d’hébergement et les lieux communautaires de Victoria, avec réception et accès public précisés.',
    ],
    topics: [
      [
        'Island destination, building-specific receipt',
        'Destination insulaire, réception propre au bâtiment',
        'For Victoria, Saanich or Langford properties, provide the final postal code and receiving hours before comparing delivery estimates. Ask whether the quote includes delivery to the building or a separate receiving point. Do not promise a service visit from a shipping estimate; equipment transport and on-site work are different arrangements.',
        'Pour Victoria, Saanich ou Langford, fournissez le code postal final et les heures de réception avant de comparer les délais. Demandez si la livraison vise le bâtiment ou un autre point. Un délai d’expédition ne confirme pas une visite; transport et travaux sur place sont des modalités distinctes.',
      ],
      [
        'Guest access and shared lobbies',
        'Accès des visiteurs et halls partagés',
        'For accommodation or a shared community building, identify whether the lobby remains accessible during evening use. Keep the AED location separate from storage controlled by a single tenant. Request signage that explains the actual route and designate the role that checks the device when front-desk staffing changes.',
        'Dans un lieu d’hébergement ou un bâtiment communautaire partagé, vérifiez l’accès au hall en soirée. Distinguez l’emplacement du DEA d’un rangement contrôlé par un seul locataire. Demandez une signalisation correspondant au trajet réel et désignez le responsable lors des changements à l’accueil.',
      ],
    ],
    checks: [
      [
        'Island destination postal code',
        'Code postal de la destination insulaire',
      ],
      ['Lobby and evening access', 'Accès au hall et en soirée'],
      [
        'Separate freight and site-work scope',
        'Portées distinctes du transport et des travaux',
      ],
    ],
    question: [
      'Does delivery to Victoria include installation?',
      'La livraison à Victoria comprend-elle l’installation?',
    ],
    answer: [
      'Only if the written quote explicitly includes a confirmed installation scope. Request equipment delivery and mounting as separate items.',
      'Seulement si la soumission comprend explicitement une installation confirmée. Demandez des postes distincts pour la livraison et la fixation.',
    ],
  },
  saskatoon: {
    intro: [
      'Plan Saskatoon AED purchases for workplaces, community facilities and regional operations, separating a city base from equipment sent to other sites.',
      'Planifiez des achats de DEA à Saskatoon pour le travail, les lieux communautaires et les activités régionales, en distinguant la base des destinations finales.',
    ],
    topics: [
      [
        'Equipment leaving the city base',
        'Équipement quittant la base en ville',
        'For a Saskatoon organization dispatching equipment to other worksites, record which AED stays at the base and which travels. Provide the receiving address for each project and identify who assumes responsibility at arrival. A spare consumable pack should be matched to the assigned device rather than treated as a universal kit.',
        'Pour une organisation de Saskatoon qui expédie vers d’autres chantiers, notez quel DEA reste à la base et lequel voyage. Donnez l’adresse de chaque projet et le responsable à l’arrivée. Associez les consommables de rechange à l’appareil désigné plutôt que de les traiter comme une trousse universelle.',
      ],
      [
        'Community rooms with rotating operators',
        'Salles communautaires à exploitants multiples',
        'A hall used by different groups needs a shared record owner even when the booking contact changes. Document who opens the room, where the AED is visible and where inspection information is kept. If the facility shuts for part of the year, assign storage and reopening checks before the last event.',
        'Une salle utilisée par plusieurs groupes a besoin d’un responsable du registre même si le contact de réservation change. Notez qui ouvre, où le DEA est visible et où sont conservées les vérifications. Si le lieu ferme une partie de l’année, attribuez l’entreposage et le contrôle de réouverture.',
      ],
    ],
    checks: [
      [
        'Base and project destination list',
        'Liste de la base et des destinations de projet',
      ],
      [
        'Device-to-consumable match',
        'Correspondance entre appareil et consommables',
      ],
      [
        'Shared-building record owner',
        'Responsable du registre du bâtiment partagé',
      ],
    ],
    question: [
      'Should a mobile AED have its own inventory record?',
      'Un DEA mobile devrait-il avoir son propre dossier?',
    ],
    answer: [
      'Yes. Track its exact model, current location, responsible person and supply dates through each handover.',
      'Oui. Suivez son modèle exact, son emplacement, son responsable et les dates des fournitures à chaque remise.',
    ],
  },
  regina: {
    intro: [
      'Prepare a Regina AED enquiry for offices, meeting venues and multi-building operations, with visitor access and supply replacement responsibilities defined.',
      'Préparez une demande de DEA à Regina pour les bureaux, salles de réunion et installations multiples, en précisant l’accès et le remplacement des fournitures.',
    ],
    topics: [
      [
        'Meeting hours may exceed office hours',
        'Les réunions peuvent dépasser les heures de bureau',
        'For a Regina office that hosts evening meetings, compare public-room hours with reception and security schedules. Identify the route to the AED after administrative staff leave. Include event-room contacts in the placement review, rather than assigning the decision only to the person who processes the equipment order.',
        'Dans un bureau de Regina qui accueille des réunions en soirée, comparez l’horaire des salles à ceux de la réception et de la sécurité. Repérez le trajet après le départ du personnel administratif. Associez les responsables des salles au choix d’emplacement, au-delà de la personne chargée des achats.',
      ],
      [
        'Replacement purchasing needs an owner',
        'Le renouvellement des fournitures exige un responsable',
        'A readiness check and a replacement order are separate tasks. Specify who records expiry dates, who can approve a purchase and who confirms the new item is installed according to the manual. For multiple Regina buildings, keep this chain visible by address so a centralized budget does not leave a local unit waiting.',
        'Une vérification et une commande de remplacement sont deux tâches distinctes. Précisez qui consigne les dates, autorise l’achat et confirme la mise en place selon le manuel. Pour plusieurs bâtiments de Regina, conservez cette chaîne par adresse afin qu’un budget central ne laisse pas un appareil sans suivi.',
      ],
    ],
    checks: [
      [
        'Evening meeting and security schedules',
        'Horaires des réunions et de la sécurité',
      ],
      [
        'Supply purchaser and approval route',
        'Acheteur des fournitures et circuit d’approbation',
      ],
      ['Local contact at each building', 'Contact local dans chaque bâtiment'],
    ],
    question: [
      'Is an expiry reminder the same as an inspection?',
      'Un rappel d’échéance équivaut-il à une inspection?',
    ],
    answer: [
      'No. A reminder supports scheduling; someone must still perform and record the checks required by the device manufacturer.',
      'Non. Le rappel aide à planifier; une personne doit toujours effectuer et consigner les vérifications exigées par le fabricant.',
    ],
  },
} satisfies Record<string, CityBrief>;
