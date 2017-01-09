import Ember from 'ember';

export default Ember.Component.extend({
    dialogService: Ember.inject.service(),
    fileUploadProgress: 0,
    saveDisabled: false,
    saveButtonText: 'Save',
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
        uploadError: function(jqXHR, textStatus, errorThrown) {
            this.set('saveDisabled', false);
            this.set('saveButtonText', 'Save');
            this.set('fileUploadProgress', 0);
            alert('Sorry, there was an error. Upload aborted.');
        },
        uploadProgress: function(percent) {
            this.set('saveDisabled', true);
            this.set('saveButtonText', 'Wait');
            this.set('fileUploadProgress', percent);
        },
        uploadComplete: function(url) {
            this.set('fileUploadProgress', 100);
            this.set('saveButtonText', 'Save');
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
            }).catch((error) => {
                alert('Sorry, there was an error saving to the server.');
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
