import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:index', 'Unit | Controller | index', {
  // Specify the other units that are required for this test.
  needs: ['service:dialogService']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});

test('works are sorted by author', function(assert) {
    let controller = this.subject();
    controller.set('model', [
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"},
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"}
    ]);

    assert.deepEqual(controller.get('sorted'), [
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"},
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"}
    ]);
});

test('works are sorted by title', function(assert) {
    let controller = this.subject();
    controller.set('model', [
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"},
        {"id": "3", "author": "Eve", "bookpuller": "Jack", "comments": "Hi", "issue": "5", "title": "Veni Vedi Vici", "volume": "2017"},
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"}
    ]);

    controller.send('changesort', 'title');
    assert.deepEqual(controller.get('sorted'), [
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"},
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"},
        {"id": "3", "author": "Eve", "bookpuller": "Jack", "comments": "Hi", "issue": "5", "title": "Veni Vedi Vici", "volume": "2017"}
    ]);
});

test('works are sorted by issue', function(assert) {
    let controller = this.subject();
    controller.set('model', [
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"},
        {"id": "3", "author": "Eve", "bookpuller": "Jack", "comments": "Hi", "issue": "5", "title": "Veni Vedi Vici", "volume": "2017"},
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"}
    ]);

    controller.send('changesort', 'issue');
    assert.deepEqual(controller.get('sorted'), [
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"},
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"},
        {"id": "3", "author": "Eve", "bookpuller": "Jack", "comments": "Hi", "issue": "5", "title": "Veni Vedi Vici", "volume": "2017"}
    ]);
});

test('works are reverse sorted by bookpuller', function(assert) {
    let controller = this.subject();
    controller.set('model', [
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"},
        {"id": "3", "author": "Eve", "bookpuller": "Jack", "comments": "Hi", "issue": "5", "title": "Veni Vedi Vici", "volume": "2017"},
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"}
    ]);

    controller.send('changesort', 'bookpuller');
    controller.send('changesort', 'bookpuller');

    assert.deepEqual(controller.get('sorted'), [
        {"id": "3", "author": "Eve", "bookpuller": "Jack", "comments": "Hi", "issue": "5", "title": "Veni Vedi Vici", "volume": "2017"},
        {"id": "1", "author": "Bob", "bookpuller": null, "comments": null, "issue": "2", "title": "Res Ipsa Loquitur", "volume": "2018"},
        {"id": "2", "author": "Alice", "bookpuller": null, "comments": null, "issue": "1", "title": "In Vino Veritas", "volume": "2018"}
    ]);
});
