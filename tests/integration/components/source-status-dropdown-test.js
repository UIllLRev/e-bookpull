import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from "@ember/test-helpers";
import hbs from 'htmlbars-inline-precompile';

module('source-status-dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{source-status-dropdown}}`);

    assert.equal(this.element.innerText.trim(), '');

    // Template block usage:
    await render(hbs`
    {{#source-status-dropdown}}
      template block text
    {{/source-status-dropdown}}
  `);

    assert.equal(this.element.innerText.trim(), 'template block text');
  });
});
