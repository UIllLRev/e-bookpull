import Component from '@ember/component';

export default Component.extend({
    doConfirm: false,
    fileUploadProgress: 0,
    showDialog: false,
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
                this.set('fileUploadProgress', 0);
            }).catch(() => {
                alert('Sorry, there was an error saving to the server. Please try again.');
            });
        },
        close: function() {
          this.get('model').rollbackAttributes();
          this.set('fileUploadProgress', 0);
        },
        delete: function() {
          this.set('doConfirm', true);
        },
        reallyDelete: function() {
            this.get('model').destroyRecord();
            this.set('model', null);
            this.set('fileUploadProgress', 0);
        }
    }
});
