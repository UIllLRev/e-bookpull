import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        save() {
            this.controller.model.save();
            this.transitionTo('index');
            return false;
        }
    }
});
