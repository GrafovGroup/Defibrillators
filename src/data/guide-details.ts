import type { DetailPage } from './pages';
import type { PageId } from './routes';
const mdall = {
  label: 'Health Canada — MDALL',
  url: 'https://health-products.canada.ca/mdall-limh/index-eng.jsp',
};
const philips = {
  label: 'Philips — HeartStart FRx',
  url: 'https://www.usa.philips.com/healthcare/product/HC861304/heartstart-frx-automated-external-defibrillator',
};
const defibtech = {
  label: 'Defibtech — Lifeline VIEW specifications',
  url: 'https://www.defibtech.com/products/lifeline-view-aed/',
};
export const guideDetails: Partial<
  Record<PageId, NonNullable<DetailPage['guide']>>
> = {
  buying: {
    reviewed: '2026-11-07',
    summary: {
      en: 'Choose an AED by its exact configuration and the needs of your site: language, users, storage, compatible supplies and ongoing responsibilities. Compare the complete package before accepting a quote.',
      fr: 'Choisissez un DEA selon sa configuration exacte et les besoins du lieu : langues, utilisateurs, rangement, fournitures compatibles et responsabilités de suivi. Comparez l’ensemble avant d’accepter une soumission.',
    },
    sources: [mdall, philips, defibtech],
    faqs: {
      en: [
        {
          heading: 'Is there one best AED for every workplace?',
          body: 'No single specification settles every purchase. Compare the exact configuration, user guidance, supplies, language needs and site conditions, then confirm the supplier’s written scope.',
        },
        {
          heading: 'Does a waterproof rating mean I can leave an AED outdoors?',
          body: 'A dust or water resistance rating is only one consideration. Review the manufacturer’s operating and standby temperature limits, enclosure requirements and your site conditions before choosing outdoor storage.',
        },
      ],
      fr: [
        {
          heading:
            'Existe-t-il un meilleur DEA pour tous les milieux de travail?',
          body: 'Aucune caractéristique unique ne règle tous les choix. Comparez la configuration, le guidage, les fournitures, les langues et les conditions du lieu, puis confirmez la portée écrite du fournisseur.',
        },
        {
          heading: 'Un indice d’étanchéité permet-il de laisser le DEA dehors?',
          body: 'La résistance à la poussière ou à l’eau n’est qu’un critère. Examinez les limites de température de fonctionnement et de veille, le boîtier requis et les conditions du lieu avant de choisir un rangement extérieur.',
        },
      ],
    },
  },
  care: {
    reviewed: '2026-11-07',
    summary: {
      en: 'Assign a responsible person, keep an equipment record and follow the inspection and replacement instructions for the exact model. Record findings and escalate faults through the qualified service route.',
      fr: 'Désignez un responsable, tenez une fiche d’équipement et suivez les consignes de vérification et de remplacement du modèle exact. Consignez les constats et signalez les défaillances au service qualifié.',
    },
    sources: [defibtech, philips],
    faqs: {
      en: [
        {
          heading: 'Do all AEDs follow the same replacement schedule?',
          body: 'No. Record the manufacturer’s dates and instructions for each device, pad set and battery. Do not use another model’s schedule or assume that an inspection service includes replacement supplies.',
        },
        {
          heading: 'Can a readiness check replace technical servicing?',
          body: 'A documented check of access, condition and indicated status is different from technical repair. Follow the device instructions and use the appropriate qualified service channel for faults.',
        },
      ],
      fr: [
        {
          heading:
            'Tous les DEA suivent-ils le même calendrier de remplacement?',
          body: 'Non. Consignez les dates et instructions du fabricant pour chaque appareil, jeu d’électrodes et batterie. N’utilisez pas le calendrier d’un autre modèle et ne présumez pas que les remplacements sont inclus dans une inspection.',
        },
        {
          heading: 'Une vérification remplace-t-elle le service technique?',
          body: 'Une vérification documentée de l’accès, de l’état et du témoin est différente d’une réparation technique. Suivez les instructions et recourez au service qualifié approprié en cas de défaillance.',
        },
      ],
    },
  },
  costs: {
    reviewed: '2026-11-07',
    summary: {
      en: 'Compare the total scope, not only the device price. Add setup, compatible replacements, training and agreed support over the same planning period. Request current, itemized prices rather than relying on an advertised starting figure.',
      fr: 'Comparez la portée totale, pas seulement le prix de l’appareil. Additionnez la mise en place, les remplacements compatibles, la formation et le soutien sur une même période. Demandez des prix détaillés actuels plutôt qu’un prix de départ annoncé.',
    },
    sources: [defibtech, philips],
    faqs: {
      en: [
        {
          heading: 'Are replacement pads and batteries always included?',
          body: 'Only if the written quote or service agreement includes them. Confirm the exact compatible items, quantities, replacement conditions and any exclusions.',
        },
        {
          heading:
            'Can I get one quote for equipment, installation and training?',
          body: 'Yes. Describe the equipment, locations and support you want in the enquiry. The written proposal will confirm what can be supplied, who provides each service and the applicable terms.',
        },
      ],
      fr: [
        {
          heading:
            'Les électrodes et batteries de remplacement sont-elles toujours incluses?',
          body: 'Seulement si la soumission ou l’entente écrite le prévoit. Confirmez les articles compatibles exacts, les quantités, les conditions de remplacement et les exclusions.',
        },
        {
          heading:
            'Puis-je demander une soumission pour l’équipement, l’installation et la formation?',
          body: 'Oui. Décrivez l’équipement, les emplacements et le soutien souhaité dans la demande. La proposition écrite confirmera ce qui peut être fourni, les prestataires et les modalités applicables.',
        },
      ],
    },
  },
};
