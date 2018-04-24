import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        window.componentHandler.upgradeElement(this.$('.mdl-spinner').get(0));
    }
});
