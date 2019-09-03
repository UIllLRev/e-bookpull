import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
module('Unit | Model | source', function(hooks) {
  setupTest(hooks);

  test('should contain attributes', function(assert) {
    let store = this.owner.lookup('service:store');
    //let model = run(() => store.createRecord('source', {}));

    let Source = store.modelFor('source');
    let attributes = get(Source, 'attributes');
    assert.equal(attributes.get('type').type, 'string', 'type is a string');
    assert.equal(attributes.get('citation').type, 'base64', 'citation is a base64');
    assert.equal(attributes.get('url').type, 'string', 'url is a string');
    assert.equal(attributes.get('comments').type, 'base64', 'comments is a base64');
    assert.equal(attributes.get('ordered').type, 'date', 'ordered is a date');
    assert.equal(attributes.get('status').type, 'string', 'status is a string');
  });

  test('should belong to a work', function(assert) {
    let store = this.owner.lookup('service:store');
    //let model = run(() => store.createRecord('source', {}));

    let Source = store.modelFor('source');
    let relationship = get(Source, 'relationshipsByName').get('work');
    assert.equal(relationship.key, 'work', 'has relationship with Work');
    assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  });
});
