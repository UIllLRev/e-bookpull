import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    fileUploadProgress: 0,
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
    actions: {
        uploadError: function() {
            this.set('fileUploadProgress', 0);
            alert('Sorry, there was an error. Upload aborted.');
        },
        uploadProgress: function(percent) {
            this.set('fileUploadProgress', percent/100);
        },
        uploadComplete: function() {
            this.set('fileUploadProgress', 1);
        },
        save: function() {
            this.get('model').save().then(() => {
                this.set('model', null);
                this.set('fileUploadProgress', 0);
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
});
