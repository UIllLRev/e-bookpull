import Component from '@ember/component';
import { inject } from '@ember/service';
import config from '../config/environment';

export default Component.extend({
    dialogService: inject(),
    fileUploadProgress: 0,
    saveDisabled: false,
    saveButtonText: 'Save',
    didInsertElement() {
        var dialog = this.$('dialog').get(0);
        if (! dialog.showModal) {
            // eslint-disable-next-line no-undef
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.addEventListener('cancel', () => {
            this.get('model').rollbackAttributes();
        });
        this.get('dialogService').registerSourceDialog(this);
    },
    init() {
        this._super(...arguments);

        this.statuses = ['X', 'E', 'XP', 'XR', 'M', 'R'];
        this.types = ['B', 'C', 'J', 'L', 'P', 'M'];
    },
    actions: {
        uploadError: function(/* jqXHR, textStatus, errorThrown */) {
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
        uploadComplete: function(data) {
            this.set('fileUploadProgress', 100);
            this.set('saveButtonText', 'Save');
            this.set('saveDisabled', false);
            this.get('model').set('url', data['url']);
            this.get('model').set('status', 'E');
        },
        show: function(work) {
            var dialog = this.$('dialog').get(0);
            this.set('fileUploadProgress', 0);
            this.set('model', work);
            dialog.showModal();
        },
        save: function() {
            var url = this.get('model').get('url');
            if (url != null && url.length > 0 && !url.startsWith(config.rootURL) && !url.startsWith('http://') && !url.startsWith('https://'))
            {
                alert('Invalid URL. It must begin with "' + config.rootURL + '" (for uploaded files) or "http://" or "https://".');
                return;
            }
            var dialog = this.$('dialog').get(0);
            this.get('model').save().then(() => {
                dialog.close();
            }).catch(() => {
                alert('Sorry, there was an error saving to the server.');
            });
        },
        close: function() {
            var dialog = this.$('dialog').get(0);
            this.get('model').rollbackAttributes();
            dialog.close();
        },
        delete: function() {
            this.get('dialogService').showConfirmDialog(
                'Are you sure you want to delete ' + this.get('model').get('citation') + '?',
                this.actions.reallyDelete.bind(this)
                );
        },
        reallyDelete: function() {
            this.get('model').destroyRecord();
            var dialog = this.$('dialog').get(0);
            dialog.close();
        }
    },
});
