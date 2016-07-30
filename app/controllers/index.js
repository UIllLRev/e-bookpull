import Ember from 'ember';

export default Ember.Controller.extend({
    dialogService: Ember.inject.service(),
    actions: {
        add() {
            var work = this.get('store').createRecord('work');
            this.get('dialogService').showWorkDialog(work);
        },
        edit(work) {
            this.get('dialogService').showWorkDialog(work);
            return false;
        }
    },
    sortBy: ['author'],
    sorted: Ember.computed.sort('model', 'sortBy')
});
