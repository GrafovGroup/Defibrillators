export function budgetTotal(values: string[]): number | null {
  if (values.every((value) => !value.trim())) return null;
  let cents = 0;
  for (const raw of values) {
    const value = raw.trim();
    if (!value) continue;
    if (!/^\d{1,9}(?:\.\d{1,2})?$/.test(value)) return null;
    cents += Math.round(Number(value) * 100);
  }
  return cents / 100;
}
