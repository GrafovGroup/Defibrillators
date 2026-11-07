import { modelIds } from '../data/model-options.ts';
import {
  partOptions,
  packageOptions,
  trainingOptions,
} from '../data/planning-options.ts';
export const formEndpoint = 'https://formspree.io/f/maeezonn';
export const consentVersion = 'rfq-2026-11-06';
export const provinces = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
] as const;
export const requestTypes = [
  'equipment',
  'accessories',
  'installation',
  'maintenance',
  'programs',
  'training',
] as const;
export const maintenanceTypes = [
  'discuss',
  'none',
  'one-time',
  'recurring',
  'renewal',
] as const;
export type RfqLocale = 'en' | 'fr';
export const consentText = {
  en: 'I agree that Defibrillators.ca may use my contact and project details to respond to this request, with Formspree processing the submission. This does not subscribe me to marketing.',
  fr: 'J’accepte que Defibrillators.ca utilise mes coordonnées et les détails du projet pour répondre à cette demande, traitée par Formspree. Ce consentement ne constitue pas un abonnement au marketing.',
};
export const requestLabels = {
  en: [
    'AED equipment',
    'Accessories',
    'Installation',
    'Maintenance',
    'Multi-site program',
    'CPR / AED training',
  ],
  fr: [
    'Équipement DEA',
    'Accessoires',
    'Installation',
    'Entretien',
    'Programme multisite',
    'Formation RCR / DEA',
  ],
};
export const maintenanceLabels = {
  en: [
    'To discuss',
    'Not needed',
    'One-time inspection',
    'Recurring plan enquiry',
    'Existing plan renewal',
  ],
  fr: [
    'À discuter',
    'Non requis',
    'Vérification ponctuelle',
    'Demande de plan récurrent',
    'Renouvellement d’un plan existant',
  ],
};
export const messages = {
  en: {
    required: 'Complete this required field.',
    email: 'Enter a valid email address.',
    invalid: 'Check this value.',
    length: 'Enter between {min} and {max} characters.',
    quantity: 'Enter a whole number from 1 to 9999.',
    consent: 'Confirm your consent before sending.',
    attachment: 'Choose one PDF, JPG or PNG file, up to 2 MB.',
    summary: 'Please check the highlighted fields.',
    sending: 'Sending your request…',
    success:
      'Thank you. Your request has been received. We will review it and contact you. This is not an order or a booking.',
    failure:
      'We could not confirm receipt. Your details are still here. Please try again, or contact us by phone or email.',
    limited:
      'The form service is temporarily unavailable. Please try later, or contact us by phone or email.',
    verification:
      'Additional verification is needed. Continue securely with Formspree to finish sending your request.',
  },
  fr: {
    required: 'Remplissez ce champ obligatoire.',
    email: 'Saisissez une adresse courriel valide.',
    invalid: 'Vérifiez cette valeur.',
    length: 'Saisissez entre {min} et {max} caractères.',
    quantity: 'Saisissez un nombre entier de 1 à 9999.',
    consent: 'Confirmez votre consentement avant l’envoi.',
    attachment: 'Choisissez un fichier PDF, JPG ou PNG de 2 Mo maximum.',
    summary: 'Veuillez vérifier les champs indiqués.',
    sending: 'Envoi de votre demande…',
    success:
      'Merci. Votre demande a été reçue. Nous l’examinerons et communiquerons avec vous. Il ne s’agit pas d’une commande ni d’une réservation.',
    failure:
      'Nous ne pouvons pas confirmer la réception. Vos renseignements sont conservés dans ce formulaire. Réessayez ou joignez-nous par téléphone ou courriel.',
    limited:
      'Le service de formulaire est temporairement indisponible. Réessayez plus tard ou joignez-nous par téléphone ou courriel.',
    verification:
      'Une vérification supplémentaire est nécessaire. Continuez sur Formspree pour terminer l’envoi de votre demande.',
  },
};
export type FieldErrors = Record<string, string>;
const textValue = (data: FormData, key: string) =>
  typeof data.get(key) === 'string' ? String(data.get(key)).trim() : '';
export function validateRfq(data: FormData, lang: RfqLocale): FieldErrors {
  const m = messages[lang];
  const errors: FieldErrors = {};
  for (const key of [
    'name',
    'email',
    'province',
    'message',
    'audience',
    'request_type',
  ]) {
    if (!textValue(data, key)) errors[key] = m.required;
  }
  if (textValue(data, 'audience') === 'commercial') {
    for (const key of ['company', 'locations'])
      if (!textValue(data, key)) errors[key] = m.required;
  }
  const email = textValue(data, 'email');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = m.email;
  const limits: Record<string, [number, number]> = {
    name: [2, 100],
    email: [3, 254],
    company: [2, 160],
    phone: [5, 40],
    locations: [2, 1000],
    message: [10, 4000],
    renewal_reference: [1, 100],
    part_reference: [1, 100],
  };
  for (const [key, [min, max]] of Object.entries(limits)) {
    const value = textValue(data, key);
    if (value && (value.length < min || value.length > max))
      errors[key] = m.length
        .replace('{min}', String(min))
        .replace('{max}', String(max));
  }
  const allowed: Record<string, readonly string[]> = {
    province: provinces,
    audience: ['commercial', 'residential'],
    request_type: requestTypes,
    model: ['', 'discuss', ...modelIds, 'other'],
    accessory_type: ['', ...partOptions.map((p) => p.id)],
    package: ['', ...packageOptions.map((p) => p.id)],
    training_language: [
      '',
      ...trainingOptions.training_language.map((p) => p.id),
    ],
    training_format: ['', ...trainingOptions.training_format.map((p) => p.id)],
    training_course: ['', ...trainingOptions.training_course.map((p) => p.id)],
    maintenance: maintenanceTypes,
    installation: ['discuss', 'yes', 'no'],
  };
  for (const [key, values] of Object.entries(allowed))
    if (!errors[key] && !values.includes(textValue(data, key)))
      errors[key] = m.invalid;
  for (const key of ['quantity', 'training_participants']) {
    const quantity = textValue(data, key);
    if (
      quantity &&
      (!/^\d+$/.test(quantity) ||
        Number(quantity) < 1 ||
        Number(quantity) > 9999)
    )
      errors[key] = m.quantity;
  }
  if (data.get('consent') !== 'yes') errors.consent = m.consent;
  const file = data.get('attachment');
  if (
    file instanceof File &&
    file.size > 0 &&
    (file.size > 2 * 1024 * 1024 ||
      !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type) ||
      !/\.(pdf|jpe?g|png)$/i.test(file.name))
  )
    errors.attachment = m.attachment;
  return errors;
}
export type SubmissionResult =
  | { kind: 'success' }
  | {
      kind: 'error';
      message: string;
      fields: FieldErrors;
      verification?: boolean;
    };
export async function submitRfq(
  data: FormData,
  lang: RfqLocale,
  send: typeof fetch = fetch,
): Promise<SubmissionResult> {
  const m = messages[lang];
  try {
    const response = await send(formEndpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(25000),
    });
    const body: unknown = await response.json();
    if (!body || typeof body !== 'object')
      throw new Error('Invalid provider response');
    const result = body as {
      ok?: boolean;
      errors?: { field?: string; code?: string }[];
    };
    if (response.ok && result.ok === true) return { kind: 'success' };
    const fields: FieldErrors = {};
    let verification = false;
    for (const error of Array.isArray(result.errors) ? result.errors : []) {
      if (/CAPTCHA/i.test(error.code ?? '')) verification = true;
      if (error.field && /^[a-z_]+$/.test(error.field))
        fields[error.field] =
          error.field === 'email'
            ? m.email
            : error.field === 'consent'
              ? m.consent
              : m.invalid;
    }
    return {
      kind: 'error',
      fields,
      verification,
      message: verification
        ? m.verification
        : response.status === 429
          ? m.limited
          : Object.keys(fields).length
            ? m.summary
            : m.failure,
    };
  } catch {
    return { kind: 'error', fields: {}, message: m.failure };
  }
}
