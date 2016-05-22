import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        this._super(...arguments);
        componentHandler.upgradeElement(this.$('div.mdl-tabs').get(0));
    }
});
