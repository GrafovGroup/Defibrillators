export function normalizeSearch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
const synonyms: Record<string, string> = {
  defibrillators: 'aed',
  defibrillator: 'aed',
  defibrillateurs: 'aed',
  defibrillateur: 'aed',
  dea: 'aed',
  batteries: 'battery',
  batterie: 'battery',
  piles: 'battery',
  pile: 'battery',
  electrodes: 'pads',
  electrode: 'pads',
  pad: 'pads',
  formation: 'training',
  rcr: 'cpr',
  entretien: 'maintenance',
  armoires: 'cabinet',
  armoire: 'cabinet',
  cabinets: 'cabinet',
  pediatrique: 'child',
  pediatriques: 'child',
  paediatric: 'child',
  pediatric: 'child',
  enfant: 'child',
  enfants: 'child',
  prix: 'cost',
  cout: 'cost',
  costs: 'cost',
  price: 'cost',
  prices: 'cost',
};
export function searchTokens(value: string): string[] {
  return normalizeSearch(value)
    .split(' ')
    .filter(Boolean)
    .map((word) => synonyms[word] ?? word);
}
export function searchScore(
  title: string,
  text: string,
  query: string,
): number {
  const terms = searchTokens(query).slice(0, 12);
  if (!terms.length) return 1;
  const titleWords = searchTokens(title);
  const words = [...titleWords, ...searchTokens(text)];
  if (
    !terms.every((term) =>
      words.some(
        (word) => word === term || (term.length >= 3 && word.startsWith(term)),
      ),
    )
  )
    return 0;
  return terms.reduce(
    (score, term) => score + (titleWords.includes(term) ? 10 : 1),
    1,
  );
}
