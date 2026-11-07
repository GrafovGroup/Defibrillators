import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function report(records) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lead-outcome-test-'));
  try {
    const input = path.join(dir, 'leads.json');
    fs.writeFileSync(input, JSON.stringify(records));
    return spawnSync(process.execPath, ['scripts/lead-outcomes.mjs', input], {
      encoding: 'utf8',
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
test('Private lead report separates quoted pipeline from won revenue and omits identifiers', () => {
  const result = report([
    { requestId: 'private-new-id', stage: 'new', nextFollowUp: '2026-11-10' },
    { requestId: 'private-quote-id', stage: 'quoted', valueCAD: 9000 },
    { requestId: 'private-win-id', stage: 'won', valueCAD: 1200.2 },
    { requestId: 'private-win-2-id', stage: 'won', valueCAD: 20.1 },
    { requestId: 'private-loss-id', stage: 'lost', valueCAD: 5000 },
  ]);
  assert.equal(result.status, 0);
  const data = JSON.parse(result.stdout);
  assert.equal(data.leads, 5);
  assert.equal(data.stages.quoted, 1);
  assert.equal(data.stages.won, 2);
  assert.equal(data.wonRevenueCAD, 1220.3);
  assert.doesNotMatch(result.stdout, /private-/);
});
test('Private lead report refuses personal fields, bad dates and duplicate or invalid records', () => {
  for (const records of [
    [{ requestId: 'a', stage: 'new', email: 'private@example.test' }],
    [{ requestId: 'a', stage: 'unknown' }],
    [{ requestId: 'a', stage: 'won', valueCAD: -1 }],
    [{ requestId: 'a', stage: 'new', nextFollowUp: '2026-02-30' }],
    [{ requestId: 'a', stage: 'new', nextFollowUp: false }],
    [
      { requestId: 'a', stage: 'new' },
      { requestId: ' a ', stage: 'won' },
    ],
    {},
  ]) {
    const result = report(records);
    assert.notEqual(result.status, 0);
    assert.equal(result.stdout, '');
    assert.doesNotMatch(result.stderr, /private@example/);
  }
});
