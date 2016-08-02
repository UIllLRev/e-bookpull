import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdl-datefield', 'Integration | Component | mdl datefield', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdl-datefield}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdl-datefield}}
      template block text
    {{/mdl-datefield}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
