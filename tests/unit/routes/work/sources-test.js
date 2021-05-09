import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('route:work/sources', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:work/sources');
    assert.ok(route);
  });
});
