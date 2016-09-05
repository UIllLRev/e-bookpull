import Ember from 'ember';

export default Ember.Controller.extend({
    breadCrumbs: Ember.computed('model.author', function() {
        return [{label: "Home", path:"index"}, {label: this.get('model').get('author'), path: false}];
    })
});
