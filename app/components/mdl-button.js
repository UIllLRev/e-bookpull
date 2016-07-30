import Ember from 'ember';

let MdlButton = Ember.Component.extend({
    didInsertElement() {
        componentHandler.upgradeElement(this.$('button').get(0));
    },
    click() {
        this.sendAction('action');
        return false;
    }
});
export default MdlButton;
