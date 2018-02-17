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
        }
    },
    sorted: sort('model', 'author')
});
