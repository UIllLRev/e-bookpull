import Ember from 'ember';

export default Ember.Component.extend({
    dialogService: Ember.inject.service(),
    actions: {
        edit(source) {
            this.get('dialogService').showSourceDialog(source);
            return false;
        }
    }
});
