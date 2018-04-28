import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
//import { run } from '@ember/runloop';

module('Unit | Model | source', function(hooks) {
  setupTest(hooks);

  test('should belong to a work', function(assert) {
    let store = this.owner.lookup('service:store');
    //let model = run(() => store.createRecord('source', {}));

    let Source = store.modelFor('source');
    let relationship = get(Source, 'relationshipsByName').get('work');
    assert.equal(relationship.key, 'work', 'has relationship with Work');
    assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  });
});
