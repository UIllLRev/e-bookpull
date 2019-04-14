import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
    fileUploadProgress: 0,
    saveDisabled: false,
    saveButtonText: 'Save',
    // Can't use bool() here because mdc-dialog clobbers the attribute
    showDialog: computed('model', {
      get() {
        return this.get('model') != null;
      },
      set(key, value) {
        if (!value) {
          this.set('model', null);
        }
        return this.get('model') != null;
      }
    }),
    didInsertElement() {
        this.element.addEventListener('cancel', () => {
            this.get('model').rollbackAttributes();
        });
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
            this.set('fileUploadProgress', percent/100);
        },
        uploadComplete: function(data) {
            this.set('fileUploadProgress', 1);
            this.set('saveButtonText', 'Save');
            this.set('saveDisabled', false);
            this.get('model').set('url', data['url']);
            this.get('model').set('status', 'E');
        },
        save: function() {
            var url = this.get('model').get('url');
            if (url != null && url.length > 0 && !url.startsWith(config.rootURL) && !url.startsWith('http://') && !url.startsWith('https://'))
            {
                alert('Invalid URL. It must begin with "' + config.rootURL + '" (for uploaded files) or "http://" or "https://".');
                return;
            }
            this.get('model').save().then(() => {
                this.set('fileUploadProgress', 0);
            }).catch(() => {
                alert('Sorry, there was an error saving to the server.');
            });
        },
        close: function() {
            this.get('model').rollbackAttributes();
            this.set('model', null);
            this.set('fileUploadProgress', 0);
        },
        delete: function() {
          // FIXME
            /*this.get('dialogService').showConfirmDialog(
                'Are you sure you want to delete ' + this.get('model').get('author') + '?',
                this.actions.reallyDelete.bind(this)
                );*/

        },
        reallyDelete: function() {
            this.get('model').destroyRecord();
            var dialog = this.element;
            dialog.close();
        }
        }
    },
});
