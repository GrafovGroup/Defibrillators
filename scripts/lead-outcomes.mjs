// Private, operator-maintained records. This command only emits aggregate counts.
import fs from 'node:fs';
const input = process.argv[2];
if (!input)
  throw new Error(
    'Usage: node scripts/lead-outcomes.mjs /private/path/lead-outcomes.json',
  );
const records = JSON.parse(fs.readFileSync(input, 'utf8'));
if (!Array.isArray(records))
  throw new Error('Expected an array of lead records');
const stages = ['new', 'qualified', 'quoted', 'won', 'lost'];
const ids = new Set();
const report = {
  leads: records.length,
  stages: Object.fromEntries(stages.map((stage) => [stage, 0])),
  wonRevenueCAD: 0,
};
for (const [index, record] of records.entries()) {
  if (
    !record ||
    typeof record.requestId !== 'string' ||
    !record.requestId.trim() ||
    ids.has(record.requestId.trim()) ||
    !stages.includes(record.stage)
  )
    throw new Error(`Invalid or duplicate lead at row ${index + 1}`);
  if (
    Object.keys(record).some(
      (key) =>
        !['requestId', 'stage', 'valueCAD', 'nextFollowUp'].includes(key),
    )
  )
    throw new Error(
      `Unexpected field at row ${index + 1}; keep contact details in the enquiry system`,
    );
  if (
    record.valueCAD !== undefined &&
    (!Number.isFinite(record.valueCAD) || record.valueCAD < 0)
  )
    throw new Error(`Invalid value at row ${index + 1}`);
  if (
    record.nextFollowUp !== undefined &&
    (typeof record.nextFollowUp !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(record.nextFollowUp) ||
      Number.isNaN(Date.parse(record.nextFollowUp)) ||
      new Date(record.nextFollowUp).toISOString().slice(0, 10) !==
        record.nextFollowUp)
  )
    throw new Error(`Invalid follow-up date at row ${index + 1}`);
  ids.add(record.requestId.trim());
  report.stages[record.stage]++;
  if (record.stage === 'won')
    report.wonRevenueCAD += Math.round((record.valueCAD ?? 0) * 100) / 100;
}
report.wonRevenueCAD = Math.round(report.wonRevenueCAD * 100) / 100;
console.log(JSON.stringify(report, null, 2));
