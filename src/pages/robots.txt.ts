import { searchConfig, robotsText } from '../lib/site-config';
export function GET() {
  return new Response(robotsText(searchConfig.indexable), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
