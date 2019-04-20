import Component from '@ember/component';

export default Component.extend({
    sourceToEdit: null,
    showSourceDialog: false,
    actions: {
      edit: function (source) {
        this.set('sourceToEdit', source);
        this.set('showSourceDialog', true);
      }
  }
});
