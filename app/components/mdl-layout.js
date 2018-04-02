import Component from '@ember/component';

export default Component.extend({
    classNames: ['mdl-layout', 'mdl-js-layout'],
    classNameBindings: ['fixed:mdl-layout--fixed-header'],
    fixed: false,
    didInsertElement() {
        window.componentHandler.upgradeElement(this.$().get(0));
    }
});
