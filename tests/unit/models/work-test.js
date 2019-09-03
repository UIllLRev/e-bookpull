import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
module('Unit | Model | work', function(hooks) {
  setupTest(hooks);

  test('should contain attributes', function(assert) {
    let store = this.owner.lookup('service:store');
    //let model = run(() => store.createRecord('work', {}));

    let Work = store.modelFor('work');
    let attributes = get(Work, 'attributes');
    assert.equal(attributes.get('author').type, 'string', 'author is a string');
    assert.equal(attributes.get('title').type, 'base64', 'title is a base64');
    assert.equal(attributes.get('volume').type, 'number', 'volume is a number');
    assert.equal(attributes.get('issue').type, 'number', 'issue is a number');
    assert.equal(attributes.get('comments').type, 'base64', 'comments is a base64');
    assert.equal(attributes.get('bookpuller').type, 'string', 'bookpuller is a string');
  });

  test('should have sources', function(assert) {
    let store = this.owner.lookup('service:store');
    //let model = run(() => store.createRecord('work', {}));

    let Work = store.modelFor('work');
    let relationship = get(Work, 'relationshipsByName').get('sources');
    assert.equal(relationship.key, 'sources', 'has relationship with Work');
    assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  });
});
