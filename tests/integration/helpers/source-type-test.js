import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | source-type', function(hooks) {
  setupRenderingTest(hooks);

  test('source-type renders Book', async function(assert) {
    this.set('inputValue', 'B');

    await render(hbs`{{source-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Book');
  });

  test('source-type renders Case', async function(assert) {
    this.set('inputValue', 'C');

    await render(hbs`{{source-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Case');
  });

  test('source-type renders Journal', async function(assert) {
    this.set('inputValue', 'J');

    await render(hbs`{{source-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Journal');
  });

  test('source-type renders Legislative', async function(assert) {
    this.set('inputValue', 'L');

    await render(hbs`{{source-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Legislative');
  });

  test('source-type renders Periodical', async function(assert) {
    this.set('inputValue', 'P');

    await render(hbs`{{source-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Periodical');
  });

  test('source-type renders Miscellaneous', async function(assert) {
    this.set('inputValue', 'M');

    await render(hbs`{{source-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Miscellaneous');
  });

  test('source-type renders Unknown', async function(assert) {
    this.set('inputValue', 'Meeseeks');

    await render(hbs`{{source-type inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Unknown');
  });
});
