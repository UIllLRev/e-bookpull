import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('confirm-dialog', 'Integration | Component | confirm dialog', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{confirm-dialog}}`);

  assert.equal(this.$('.mdl-dialog__title').text().trim(), 'Confirm');
});
