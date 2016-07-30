import Ember from 'ember';

let MdlLinkButton = Ember.LinkComponent.extend({
    didInsertElement() {
        this._super(...arguments);
        componentHandler.upgradeElement(this.$('button').get(0));
    },
    click() {
        this._super(...arguments);
        return false;
    }
});
export default MdlLinkButton;
