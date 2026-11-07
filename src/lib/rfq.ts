import {
  modelIds,
  partIds,
  packageIds,
  trainingChoices,
} from '../data/client-enquiry.ts';
export const formEndpoint = 'https://formspree.io/f/maeezonn';
export const privacyNoticeVersion = 'request-2026-11-07';
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
  'procurement',
] as const;
export const maintenanceTypes = [
  'discuss',
  'none',
  'one-time',
  'recurring',
  'renewal',
] as const;
export type RfqLocale = 'en' | 'fr';
export const privacyNoticeText = {
  en: 'We use your details to reply to your request.',
  fr: 'Nous utilisons vos coordonnées pour répondre à votre demande.',
};
export const requestLabels = {
  en: [
    'AED equipment',
    'Accessories',
    'Installation',
    'Maintenance',
    'Multi-site program',
    'CPR / AED training',
    'Tender / public-sector procurement',
  ],
  fr: [
    'Équipement DEA',
    'Accessoires',
    'Installation',
    'Entretien',
    'Programme multisite',
    'Formation RCR / DEA',
    'Appel d’offres / approvisionnement public',
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
    attachment: 'Choose up to 3 PDF, XLSX, JPG or PNG files, up to 2 MB each.',
    date: 'Enter a valid date.',
    deadline: 'Include the closing date, time and time zone.',
    url: 'Enter a public HTTPS link without login details.',
    summary: 'Please check the highlighted fields.',
    sending: 'Sending your request…',
    success:
      'Thank you — we’ve received your request. We’ll review the details and reply by email. You can call us if you need to add anything.',
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
    attachment:
      'Choisissez jusqu’à 3 fichiers PDF, XLSX, JPG ou PNG de 2 Mo chacun.',
    date: 'Saisissez une date valide.',
    deadline: 'Indiquez la date, l’heure et le fuseau horaire de clôture.',
    url: 'Saisissez un lien public HTTPS sans identifiants de connexion.',
    summary: 'Veuillez vérifier les champs indiqués.',
    sending: 'Envoi de votre demande…',
    success:
      'Merci, nous avons reçu votre demande. Nous examinerons les détails et vous répondrons par courriel. Vous pouvez nous appeler pour ajouter un renseignement.',
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
    procurement_reference: [1, 100],
    procurement_url: [1, 1000],
    deadline_zone: [1, 100],
    equipment_details: [1, 1500],
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
    accessory_type: ['', ...partIds],
    package: ['', ...packageIds],
    training_language: ['', ...trainingChoices.training_language],
    training_format: ['', ...trainingChoices.training_format],
    training_course: ['', ...trainingChoices.training_course],
    maintenance: ['', ...maintenanceTypes],
    installation: ['', 'discuss', 'yes', 'no'],
    alternatives: ['', 'specified-only', 'approval-required', 'permitted'],
    technical_training: ['', 'none', 'installation', 'repair', 'both'],
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
  const fileTypes: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  const files = data
    .getAll('attachment')
    .filter(
      (value) => !(value instanceof File && value.size === 0 && !value.name),
    );
  if (
    files.length > 3 ||
    files.some((file) => {
      if (
        !(file instanceof File) ||
        file.size === 0 ||
        file.size > 2 * 1024 * 1024
      )
        return true;
      const extension = file.name.split('.').at(-1)?.toLowerCase() ?? '';
      return (
        !Object.hasOwn(fileTypes, extension) ||
        !['', 'application/octet-stream', fileTypes[extension]].includes(
          file.type,
        )
      );
    })
  )
    errors.attachment = m.attachment;
  if (textValue(data, 'request_type') === 'procurement') {
    if (textValue(data, 'audience') !== 'commercial')
      errors.request_type = m.invalid;
    const deadlineFields = ['deadline_date', 'deadline_time', 'deadline_zone'];
    if (deadlineFields.some((key) => textValue(data, key)))
      for (const key of deadlineFields)
        if (!textValue(data, key)) errors[key] = m.deadline;
    for (const key of ['deadline_date', 'delivery_date']) {
      const value = textValue(data, key);
      if (
        value &&
        (!/^\d{4}-\d{2}-\d{2}$/.test(value) ||
          !Number.isFinite(Date.parse(value)) ||
          new Date(value).toISOString().slice(0, 10) !== value)
      )
        errors[key] = m.date;
    }
    const time = textValue(data, 'deadline_time');
    if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time))
      errors.deadline_time = m.invalid;
    const link = textValue(data, 'procurement_url');
    if (link) {
      try {
        const url = new URL(link);
        if (url.protocol !== 'https:' || url.username || url.password)
          errors.procurement_url = m.url;
      } catch {
        errors.procurement_url = m.url;
      }
    }
  }
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
      if (error.field && /^attachment(?:\[\d*\])?$/.test(error.field))
        fields.attachment = m.attachment;
      else if (error.field && /^[a-z_]+$/.test(error.field))
        fields[error.field] = error.field === 'email' ? m.email : m.invalid;
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
