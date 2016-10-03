import Ember from 'ember';

export default Ember.Component.extend({
    dialogService: Ember.inject.service(),
    fileUploadProgress: 0,
    saveDisabled: false,
    didInsertElement() {
        var dialog = this.$('dialog').get(0);
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.addEventListener('cancel', () => {
            this.get('model').rollbackAttributes();
        });
        this.get('dialogService').registerSourceDialog(this);
    },
    actions: {
        uploadProgress: function(percent) {
            this.set('saveDisabled', true);
            this.set('fileUploadProgress', percent);
        },
        uploadComplete: function(url) {
            this.set('fileUploadProgress', 100);
            this.set('saveDisabled', false);
            this.get('model').set('url', url);
            this.get('model').set('status', 'E');
        },
        show: function(work) {
            var dialog = this.$('dialog').get(0);
            this.set('fileUploadProgress', 0);
            this.set('model', work);
            dialog.showModal();
        },
        save: function() {
            var dialog = this.$('dialog').get(0);
            this.get('model').save().then(() => {
                dialog.close();
            });
        },
        close: function() {
            var dialog = this.$('dialog').get(0);
            this.get('model').rollbackAttributes();
            dialog.close();
        }
    },
    statuses: ['X', 'E', 'XP', 'XR', 'M', 'R'],
    types: ['B', 'C', 'J', 'L', 'P', 'M']
});
