import type { Locale } from './content';
import type { provinces } from '../lib/rfq';

// Submission values stay the standard two-letter codes in both languages.
export const provinceLabels: Record<
  (typeof provinces)[number],
  Record<Locale, string>
> = {
  AB: { en: 'Alberta', fr: 'Alberta' },
  BC: { en: 'British Columbia', fr: 'Colombie-Britannique' },
  MB: { en: 'Manitoba', fr: 'Manitoba' },
  NB: { en: 'New Brunswick', fr: 'Nouveau-Brunswick' },
  NL: { en: 'Newfoundland and Labrador', fr: 'Terre-Neuve-et-Labrador' },
  NS: { en: 'Nova Scotia', fr: 'Nouvelle-Écosse' },
  NT: { en: 'Northwest Territories', fr: 'Territoires du Nord-Ouest' },
  NU: { en: 'Nunavut', fr: 'Nunavut' },
  ON: { en: 'Ontario', fr: 'Ontario' },
  PE: { en: 'Prince Edward Island', fr: 'Île-du-Prince-Édouard' },
  QC: { en: 'Quebec', fr: 'Québec' },
  SK: { en: 'Saskatchewan', fr: 'Saskatchewan' },
  YT: { en: 'Yukon', fr: 'Yukon' },
};
