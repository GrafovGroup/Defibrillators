export const normalizeLocation = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
export function matchesLocation(
  text: string,
  code: string,
  query: string,
  province = '',
): boolean {
  return (
    (!province || code.split('-').includes(province)) &&
    normalizeLocation(query)
      .split(' ')
      .filter(Boolean)
      .every((word) => normalizeLocation(text).includes(word))
  );
}
