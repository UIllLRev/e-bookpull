import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
//import { run } from '@ember/runloop';

module('Unit | Model | work', function(hooks) {
  setupTest(hooks);

  test('should have sources', function(assert) {
    let store = this.owner.lookup('service:store');
    //let model = run(() => store.createRecord('work', {}));

    let Work = store.modelFor('work');
    let relationship = get(Work, 'relationshipsByName').get('sources');
    assert.equal(relationship.key, 'sources', 'has relationship with Work');
    assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  });
});
