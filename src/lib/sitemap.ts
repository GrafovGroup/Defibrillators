import { routes, pathFor, type PageId } from '../data/routes.ts';
import { siteOrigin } from './site-config.ts';
const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
export function sitemapXml(): string {
  // HTML owns reciprocal hreflang; do not maintain a second language-pair registry.
  // No fabricated lastmod dates, priority scores, form queries, assets or 404s.
  // The root redirects to /en/ and is not a separate canonical page.
  const paths = Object.keys(routes).flatMap((id) =>
    (['en', 'fr'] as const).map((lang) => pathFor(id as PageId, lang)),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escapeXml(siteOrigin + path)}</loc></url>`).join('\n')}\n</urlset>\n`;
}
