import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from "@ember/test-helpers";
import hbs from 'htmlbars-inline-precompile';

module('confirm-dialog', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{confirm-dialog}}`);

    assert.equal(this.element.querySelector('.mdl-dialog__title').innerText.trim(), 'Confirm');
  });
});
