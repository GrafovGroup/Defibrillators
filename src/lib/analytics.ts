import { consentLifetime } from '../data/analytics.ts';
import { makeMeasurement } from './measurement.ts';

export function readAnalyticsChoice(
  raw: string | null,
  now = Date.now(),
): boolean | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    return value &&
      typeof value.allowed === 'boolean' &&
      Number.isFinite(value.at) &&
      value.at <= now &&
      now - value.at < consentLifetime
      ? value.allowed
      : null;
  } catch {
    return null;
  }
}

export function analyticsEvent(
  input: unknown,
): { name: string; params: Record<string, string> } | null {
  if (!input || typeof input !== 'object') return null;
  const value = input as Record<string, unknown>;
  const clean = makeMeasurement(value.event, value);
  if (!clean) return null;
  const names: Record<string, string> = {
    page: 'page_id',
    language: 'site_language',
    source_page: 'source_page',
    city: 'planning_city',
    audience: 'enquiry_audience',
    request_type: 'request_type',
    channel: 'contact_channel',
    outcome: 'failure_category',
  };
  const params: Record<string, string> = {};
  for (const [key, name] of Object.entries(names))
    if (clean[key]) params[name] = clean[key];
  return {
    name: clean.event === 'rfq_success' ? 'generate_lead' : clean.event,
    params,
  };
}
