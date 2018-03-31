import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this._super(...arguments);
        // eslint-disable-next-line no-undef
        componentHandler.upgradeElement(this.$('div.mdl-tabs').get(0));
    }
});
