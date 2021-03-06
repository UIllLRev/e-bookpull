import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('controller:work/sources', function(hooks) {
  setupTest(hooks);

  test('sources are filtered', function(assert) {
    let controller = this.owner.lookup('controller:work/sources');
    controller.set('model', [
      {"id": "1", "citation": "New York Times", "comments": null, "ordered": null, "status": "N", "type": "P", "url": "null"},
      {"id": "2", "citation": "Blackstone's Commentaries", "comments": null, "ordered": null, "status": "N", "type": "B", "url": "null"},
      {"id": "3", "citation": "Roe v. Wade", "comments": null, "ordered": null, "status": "N", "type": "C", "url": "null"},
      {"id": "4", "citation": "U. Ill. L. Rev.", "comments": null, "ordered": null, "status": "N", "type": "J", "url": "null"},
      {"id": "5", "citation": "H.R. 5", "comments": null, "ordered": null, "status": "N", "type": "L", "url": "null"},
      {"id": "6", "citation": "Zombo.com", "comments": null, "ordered": null, "status": "N", "type": "M", "url": "null"}
    ]);

    assert.deepEqual(controller.get('books'), [
      {"id": "2", "citation": "Blackstone's Commentaries", "comments": null, "ordered": null, "status": "N", "type": "B", "url": "null"}
    ]);

    assert.deepEqual(controller.get('cases'), [
      {"id": "3", "citation": "Roe v. Wade", "comments": null, "ordered": null, "status": "N", "type": "C", "url": "null"},
    ]);
    assert.deepEqual(controller.get('journals'), [
      {"id": "4", "citation": "U. Ill. L. Rev.", "comments": null, "ordered": null, "status": "N", "type": "J", "url": "null"},
    ]);
    assert.deepEqual(controller.get('legislative'), [
      {"id": "5", "citation": "H.R. 5", "comments": null, "ordered": null, "status": "N", "type": "L", "url": "null"}
    ]);
    assert.deepEqual(controller.get('miscellaneous'), [
      {"id": "6", "citation": "Zombo.com", "comments": null, "ordered": null, "status": "N", "type": "M", "url": "null"}
    ]);
    assert.deepEqual(controller.get('periodicals'), [
      {"id": "1", "citation": "New York Times", "comments": null, "ordered": null, "status": "N", "type": "P", "url": "null"}
    ]);
  });
});
