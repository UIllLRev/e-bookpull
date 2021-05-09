import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from "@ember/test-helpers";
import hbs from 'htmlbars-inline-precompile';

module('tab-panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{tab-panel}}`);

    assert.equal(this.element.innerText.trim(), '');

    // Template block usage:
    await render(hbs`
    {{#tab-panel}}
      template block text
    {{/tab-panel}}
  `);

    assert.equal(this.element.innerText.trim(), 'template block text');
  });
});
