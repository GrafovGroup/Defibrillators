import { modelIds } from '../data/model-options.ts';
import { packageOptions, partOptions } from '../data/planning-options.ts';
import { routes } from '../data/routes.ts';
import { requestTypes } from './rfq.ts';
// Only public catalogue choices travel in links; never carry user-entered or contact data.
export function safeEnquiryParams(params: URLSearchParams): URLSearchParams {
  const safe = new URLSearchParams();
  const choices: Record<string, readonly string[]> = {
    audience: ['commercial', 'residential'],
    model: [...modelIds, 'other'],
    request: requestTypes,
    source: Object.keys(routes),
    package: packageOptions.map((p) => p.id),
    part: partOptions.map((p) => p.id),
  };
  for (const [key, values] of Object.entries(choices)) {
    const value = params.get(key);
    if (value && values.includes(value)) safe.set(key, value);
  }
  return safe;
}
