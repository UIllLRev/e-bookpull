import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | string', function(hooks) {
  setupTest(hooks);

  test('deserialize', function(assert) {
    let transform = this.owner.lookup('transform:string');
    assert.equal(transform.deserialize('test'), 'test', 'strings deserialize as strings');
    assert.equal(transform.deserialize(''), '', 'empty string deserializes as empty string');
    assert.equal(transform.deserialize(null), '', 'null deserializes as empty string');
    assert.equal(transform.deserialize(5), '5', '5 deserializes as "5"');
  });

  test('serialize', function(assert) {
    let transform = this.owner.lookup('transform:string');
    assert.equal(transform.serialize('test'), 'test', 'strings serialize as strings');
    assert.equal(transform.serialize(''), null, 'empty string serializes as null');
    assert.equal(transform.serialize(null), null, 'null serializes as null');
    assert.equal(transform.serialize(5), '5', '5 serializes as "5"');
  });

});
