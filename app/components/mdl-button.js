import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);
        componentHandler.upgradeElement(this.$('button').get(0));
    },
    click() {
        this.sendAction('action');
        return false;
    }
});
