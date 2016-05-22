import Ember from 'ember';

export default Ember.Controller.extend({
    sortBy: ['volume', 'issue', 'author'],
    sorted: Ember.computed.sort('model', 'sortBy')
});
