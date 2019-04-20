import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({
    actions: {
        add() {
            this.set('workToEdit', this.get('store').createRecord('work'));
            this.set('showWorkDialog', true);
        },
        edit(work) {
            this.set('workToEdit', work);
            this.set('showWorkDialog', true);
        },
        sources(work) {
            this.transitionToRoute('work.sources', work);
        },
        changesort(newkey) {
            if (this.get('sortKey') == newkey && this.get('sortOrder') == 'asc') {
                this.set('sortedBy', [newkey + ':desc']);
                this.set('sortOrder', 'desc');
            } else {
                this.set('sortedBy', [newkey]);
                this.set('sortOrder', 'asc');
            }
            this.set('sortKey', newkey);
        }
    },
    sortKey: 'author',
    sortOrder: 'asc',
    sortedBy: Object.freeze(['author']),
    sorted: sort('model', 'sortedBy'),
    workToEdit: null,
    showWorkDialog: false
});
