import {
  cityIds,
  modelIds,
  pageIds,
  partIds,
  packageIds,
} from '../data/client-enquiry.ts';
import { requestTypes } from './rfq.ts';
// Only public catalogue choices travel in links; never carry user-entered or contact data.
export function safeEnquiryParams(params: URLSearchParams): URLSearchParams {
  const safe = new URLSearchParams();
  const choices: Record<string, readonly string[]> = {
    audience: ['commercial', 'residential'],
    city: cityIds,
    model: [...modelIds, 'other'],
    request: requestTypes,
    source: pageIds,
    package: packageIds,
    part: partIds,
  };
  for (const [key, values] of Object.entries(choices)) {
    const value = params.get(key);
    if (value && values.includes(value)) safe.set(key, value);
  }
  return safe;
}
