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
  metadata: { environments: string[]; type: string } = {
    environments: [],
    type: '',
  },
  environment = '',
  type = '',
): boolean {
  return (
    (!brand || manufacturer === brand) &&
    (!environment || metadata.environments.includes(environment)) &&
    (!type || metadata.type === type) &&
    normalize(query)
      .split(/\s+/)
      .every((word) => normalize(searchText).includes(word))
  );
}
