import { cityIds } from '../data/city-catalogue.ts';
import { routes } from '../data/routes.ts';
import { requestTypes } from './rfq.ts';

export const measurementNames = [
  'rfq_start',
  'rfq_success',
  'rfq_error',
  'rfq_provider_handoff',
  'contact_click',
] as const;
export type MeasurementName = (typeof measurementNames)[number];
export const measurementChannel = 'defibrillators:measurement';

const choices: Record<string, readonly string[]> = {
  page: Object.keys(routes),
  language: ['en', 'fr'],
  source_page: Object.keys(routes),
  city: cityIds,
  audience: ['commercial', 'residential'],
  request_type: requestTypes,
  channel: ['phone', 'email'],
  outcome: ['validation', 'provider', 'verification'],
};

// A strict finite vocabulary: never copy URLs, form contents, IDs or free text.
export function makeMeasurement(
  name: unknown,
  input: Record<string, unknown>,
): Readonly<Record<string, string>> | null {
  if (!measurementNames.includes(name as MeasurementName)) return null;
  const result: Record<string, string> = { event: name as string };
  for (const [key, allowed] of Object.entries(choices)) {
    const value = input[key];
    if (allowed.includes(value as string)) result[key] = value as string;
  }
  if (!result.page || !result.language) return null;
  return result;
}

// Preparation only: no analytics provider, requests, storage, cookies or queue.
export function emitMeasurement(
  name: MeasurementName,
  input: Record<string, unknown>,
): void {
  const event = makeMeasurement(name, input);
  if (event)
    document.dispatchEvent(
      new CustomEvent(measurementChannel, { detail: event }),
    );
}
