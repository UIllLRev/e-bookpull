import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | date-render', function(hooks) {
  setupRenderingTest(hooks);

  test('date-render renders LocaleDateString', async function(assert) {
    this.set('inputValue', new Date('2018-04-28T16:00:00Z'));

    await render(hbs`{{date-render inputValue}}`);

    assert.equal(this.element.textContent.trim(), new Date('2018-04-28T16:00:00Z').toLocaleDateString());
  });
});
