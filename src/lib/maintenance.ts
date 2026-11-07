// Internal tracking contract only. No customer records are stored in this static site.
export interface MaintenanceRecord {
  id: string;
  sourceRequestId: string;
  customerReference: string;
  siteReferences: string[];
  deviceReferences: string[];
  ownerReference: string;
  status: 'enquiry' | 'quoted' | 'active' | 'renewal-due' | 'ended';
  acceptedAt: string | null;
  renewalDate: string | null;
  lastContactAt: string | null;
  nextActionAt: string | null;
}
export function renewalDue(record: MaintenanceRecord, today: string): boolean {
  // ISO date-only fields; contractual renewal dates must be set by an operator.
  const validDate = (value: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
  return (
    ['active', 'renewal-due'].includes(record.status) &&
    record.acceptedAt !== null &&
    record.renewalDate !== null &&
    validDate(record.renewalDate) &&
    validDate(today) &&
    record.renewalDate <= today
  );
}
