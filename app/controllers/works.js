import Ember from 'ember';

export default Ember.Controller.extend({
    sortBy: ['author'],
    sorted: Ember.computed.sort('model', 'sortBy')
});
