import Ember from 'ember';

let MdlButton = Ember.LinkComponent.extend({
    didInsertElement() {
        this._super(...arguments);
        componentHandler.upgradeElement(this.$('button').get(0));
    },
    click() {
        this.sendAction('action');
        this._super(...arguments);
        return false;
    }
});
export default MdlButton;
