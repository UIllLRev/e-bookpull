import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | source-status', function(hooks) {
  setupRenderingTest(hooks);

  test('source-status renders Not Pulled', async function(assert) {
    this.set('inputValue', 'N');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Not Pulled');
  });

  test('source-status renders On Shelf', async function(assert) {
    this.set('inputValue', 'X');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'On Shelf');
  });

  test('source-status renders Electronic', async function(assert) {
    this.set('inputValue', 'E');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Electronic');
  });

  test('source-status renders Photocopy', async function(assert) {
    this.set('inputValue', 'XP');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Photocopy');
  });

  test('source-status renders Ref Area', async function(assert) {
    this.set('inputValue', 'XR');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Ref Area');
  });

  test('source-status renders Missing', async function(assert) {
    this.set('inputValue', 'M');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Missing');
  });

  test('source-status renders Returned', async function(assert) {
    this.set('inputValue', 'R');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Returned');
  });

  test('source-status renders Unknown', async function(assert) {
    this.set('inputValue', 'Meeseeks');

    await render(hbs`{{source-status inputValue}}`);

    assert.equal(this.element.textContent.trim(), 'Unknown');
  });
});
