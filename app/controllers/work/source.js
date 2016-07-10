import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumb: Ember.computed.alias('model.citation'),
    actions: {
        save() {
            this.model.save();
            window.history.back();
            return false;
        }
    },
    statuses: ['X', 'E', 'XP', 'XR', 'M', 'R']
});
