/* Run: node tests/progress-course-order-test.js */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../js/progress-store-local-storage.js'), 'utf8');
const key = 'guessing-machines-progress-v1';

function load(raw, failWrite, failRead) {
  const saved = { [key]: raw };
  const context = {
    GM: {},
    localStorage: {
      getItem: function (name) {
        if (failRead) throw new Error('storage unavailable');
        return saved[name] || null;
      },
      setItem: function (name, value) {
        if (failWrite) throw new Error('storage unavailable');
        saved[name] = value;
      },
    },
    document: { dispatchEvent: function () {} },
    CustomEvent: function (name) { this.type = name; },
  };
  vm.runInNewContext(source, context);
  return { store: context.GM.store, saved: saved };
}

const oldNotes = {
  'application-week-week-8': { 0: 'naming ideas', 1: 'keep approved wording' },
  'application-week-week-9': { 0: '28 resolved', 1: 'check N1–N3' },
  'capstone-draft': 'my draft',
  'calibration-round-1': { hits: 8 },
};
for (const pair of [[true, false], [false, true], [true, true], [false, false], [true], [undefined, true]]) {
  const checkpoints = { 1: true, 10: false };
  if (pair[0] !== undefined) checkpoints[8] = pair[0];
  if (pair[1] !== undefined) checkpoints[9] = pair[1];
  const legacy = JSON.stringify({ checkpoints: checkpoints, jargonRevealed: true, saved: oldNotes });
  const migrated = load(legacy);
  assert.equal(migrated.store.isCheckpointDone(8), !!pair[1]);
  assert.equal(migrated.store.isCheckpointDone(9), !!pair[0]);
  assert.equal(migrated.store.isCheckpointDone(1), true);
  assert.equal(migrated.store.isJargonRevealed(), true);
  assert.equal(migrated.store.completedCount(), Object.values(checkpoints).filter(Boolean).length);
  const persisted = JSON.parse(migrated.saved[key]);
  assert.equal(persisted.courseOrderVersion, 2);
  assert.deepEqual(persisted.saved, oldNotes, 'moving checkpoints must not rewrite widget data');
  const reloaded = load(migrated.saved[key]);
  assert.equal(reloaded.store.isCheckpointDone(8), !!pair[1], 'a second load must not swap again');
  assert.equal(reloaded.store.isCheckpointDone(9), !!pair[0]);
  assert.deepEqual(JSON.parse(reloaded.saved[key]), persisted);

  const blocked = load(legacy, true);
  assert.equal(blocked.store.isCheckpointDone(8), !!pair[1], 'migration works in memory when writes fail');
  assert.equal(blocked.store.isCheckpointDone(9), !!pair[0]);
  assert.equal(blocked.store.getSaved('application-week-week-8')[0], 'naming ideas');
}

const fresh = load(null);
assert.equal(fresh.store.completedCount(), 0);
fresh.store.setCheckpointDone(8, true);
const freshReload = load(fresh.saved[key]);
assert.equal(freshReload.store.isCheckpointDone(8), true, 'new Week 8 progress stays in Week 8');
assert.equal(freshReload.store.isCheckpointDone(9), false);
assert.equal(freshReload.store.getSaved('missing', 'fallback'), 'fallback');

const unavailable = load(null, true, true);
unavailable.store.setCheckpointDone(9, true);
unavailable.store.setSaved('draft', 'offline note');
assert.equal(unavailable.store.isCheckpointDone(9), true);
assert.equal(unavailable.store.getSaved('draft'), 'offline note');
assert.equal(load('{broken JSON').store.completedCount(), 0);

console.log('course-order progress: PASS (old checkpoints, original notes, repeat loads, fresh users, unavailable storage)');
