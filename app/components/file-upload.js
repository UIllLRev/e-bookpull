import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
    filesDidChange: function(files) {
        const uploader = EmberUploader.Uploader.create({
            url: "api/upload/" + this.get('work').get('id')
        });
        uploader.on('progress', e => {
            this.sendAction('progress', e.percent);
        });


        if (!Ember.isEmpty(files)) {
            uploader.upload(files[0]).then(data => {
                this.sendAction('complete', data['url']);
            });
        }
    }
});
