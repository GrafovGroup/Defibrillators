import { sitemapXml } from '../lib/sitemap';
export function GET() {
  return new Response(sitemapXml(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
