export const modelRoutes = {
  zoll: {
    en: ['defibrillators/zoll-aed-plus', 'ZOLL AED Plus'],
    fr: ['defibrillateurs/zoll-aed-plus', 'ZOLL AED Plus'],
  },
  philips: {
    en: ['defibrillators/philips-heartstart-hs1', 'Philips HeartStart HS1'],
    fr: ['defibrillateurs/philips-heartstart-hs1', 'Philips HeartStart HS1'],
  },
  zoll3: {
    en: ['defibrillators/zoll-aed-3', 'ZOLL AED 3'],
    fr: ['defibrillateurs/zoll-aed-3', 'ZOLL AED 3'],
  },
  frx: {
    en: ['defibrillators/philips-heartstart-frx', 'Philips HeartStart FRx'],
    fr: ['defibrillateurs/philips-heartstart-frx', 'Philips HeartStart FRx'],
  },
  cr2: {
    en: ['defibrillators/lifepak-cr2', 'LIFEPAK CR2'],
    fr: ['defibrillateurs/lifepak-cr2', 'LIFEPAK CR2'],
  },
  heartsine: {
    en: [
      'defibrillators/heartsine-samaritan-350p',
      'HeartSine samaritan PAD 350P',
    ],
    fr: [
      'defibrillateurs/heartsine-samaritan-350p',
      'HeartSine samaritan PAD 350P',
    ],
  },
  g5: {
    en: ['defibrillators/powerheart-g5', 'Powerheart G5'],
    fr: ['defibrillateurs/powerheart-g5', 'Powerheart G5'],
  },
  view: {
    en: ['defibrillators/defibtech-lifeline-view', 'Defibtech Lifeline VIEW'],
    fr: ['defibrillateurs/defibtech-lifeline-view', 'Defibtech Lifeline VIEW'],
  },
} as const;
export type ModelId = keyof typeof modelRoutes;
export const modelIds = Object.keys(modelRoutes) as ModelId[];
export const modelOptions = modelIds.map((id) => ({
  id,
  name: modelRoutes[id].en[1],
}));
