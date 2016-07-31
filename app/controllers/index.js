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
        },
        sources(work) {
           // this forces a reload of the work before entering the work route
           // this gets all of the sources in one request - WAY faster
            var _this = this;
            work.reload().then(function (model) {
                _this.transitionToRoute('work.sources', model);
            });
        }
    },
    sortBy: ['author'],
    sorted: Ember.computed.sort('model', 'sortBy')
});
