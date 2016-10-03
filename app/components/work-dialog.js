import Ember from 'ember';

export default Ember.Component.extend({
    dialogService: Ember.inject.service(),
    fileUploadProgress: 0,
    didInsertElement() {
        var dialog = this.$('dialog').get(0);
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.addEventListener('cancel', () => {
            this.get('model').rollbackAttributes();
        });
        this.get('dialogService').registerWorkDialog(this);
    },
    actions: {
        uploadProgress: function(percent) {
            this.set('fileUploadProgress', percent);
        },
        uploadComplete: function() {
            this.set('fileUploadProgress', 100);
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
    }
});
