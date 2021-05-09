import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('DialogService', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:dialog-service');
    assert.ok(service);
  });
});
