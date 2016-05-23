import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        save() {
            this.model.save();
            return false;
        }
    },
    books: Ember.computed.filterBy('model.sources', 'type', 'B'),
    cases: Ember.computed.filterBy('model.sources', 'type', 'C'),
    journals: Ember.computed.filterBy('model.sources', 'type', 'J'),
    legislative: Ember.computed.filterBy('model.sources', 'type', 'L'),
    miscellaneous: Ember.computed.filterBy('model.sources', 'type', 'M'),
    periodicals: Ember.computed.filterBy('model.sources', 'type', 'P')
});
