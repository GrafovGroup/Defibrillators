const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
export function matchesProduct(
  searchText: string,
  manufacturer: string,
  query: string,
  brand: string,
): boolean {
  return (
    (!brand || manufacturer === brand) &&
    normalize(query)
      .split(/\s+/)
      .every((word) => normalize(searchText).includes(word))
  );
}
