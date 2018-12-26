import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:application', 'Unit | Adapter | application', {
    integration: true
});

// Replace this with your real tests.
test('buildQuery appends page size', function(assert) {
  let adapter = this.subject();
  assert.deepEqual(adapter.buildQuery({}), { "page": { "size": 0 } });
  assert.deepEqual(adapter.buildQuery({"include": "sources"}), { "include": "sources", "page": { "size": 0 } });
});
