import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | application', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('buildQuery appends page size', function(assert) {
    let adapter = this.owner.lookup('adapter:application');
    assert.deepEqual(adapter.buildQuery({}), { "page": { "size": 0 } });
    assert.deepEqual(adapter.buildQuery({"include": "sources"}), { "include": "sources", "page": { "size": 0 } });
  });
});
