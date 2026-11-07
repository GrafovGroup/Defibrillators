import { searchLaunch } from '../data/search-launch.ts';
export const siteOrigin = 'https://defibrillators.ca';
export function searchConfiguration(
  env: Record<string, string | undefined> = {},
) {
  const token = (key: string, fallback: string) => {
    const value = env[key]?.trim() ?? fallback;
    if (value && !/^[A-Za-z0-9_-]{8,256}$/.test(value))
      throw new Error(
        `${key} must contain only the verification token, not an HTML tag.`,
      );
    return value;
  };
  const indexable =
    env.PUBLIC_SITE_INDEXABLE === undefined
      ? searchLaunch.indexable
      : env.PUBLIC_SITE_INDEXABLE === 'true';
  return {
    indexable,
    robots: indexable ? 'index, follow' : 'noindex, nofollow',
    google: token('PUBLIC_GOOGLE_SITE_VERIFICATION', searchLaunch.google),
    bing: token('PUBLIC_BING_SITE_VERIFICATION', searchLaunch.bing),
  };
}
export const searchConfig = searchConfiguration(import.meta.env ?? {});
export function robotsText(indexable: boolean): string {
  return indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';
}
export function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
