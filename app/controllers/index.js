import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { sort } from '@ember/object/computed';

export default Controller.extend({
    dialogService: inject(),
    actions: {
        add() {
            var work = this.get('store').createRecord('work');
            this.get('dialogService').showWorkDialog(work);
        },
        edit(work) {
            this.get('dialogService').showWorkDialog(work);
            return false;
        },
        sources(work) {
           // this forces a reload of the work before entering the work route
           // this gets all of the sources in one request - WAY faster
            this.transitionToRoute('work.sources', work.reload());
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
    sorted: sort('model', 'sortedBy')
});
