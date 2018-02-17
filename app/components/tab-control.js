import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this._super(...arguments);
        componentHandler.upgradeElement(this.$('div.mdl-tabs').get(0));
    }
});
