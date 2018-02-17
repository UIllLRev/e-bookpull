import { isEmpty } from '@ember/utils';
import EmberUploader from 'ember-uploader';
import config from 'ebookpull/config/environment';

export default EmberUploader.FileField.extend({
    attributeBindings: ['type', 'multiple', 'disabled'],
    filesDidChange: function(files) {
        const uploader = EmberUploader.Uploader.create({
            url: config.rootURL + "api/" + this.get('endpoint') + "/" + this.get('work').get('id')
        });
        uploader.on('progress', e => {
            this.sendAction('progress', e.percent);
        });
        uploader.on('didError', (jqXHR, textStatus, errorThrown) => {
            this.sendAction('error', jqXHR, textStatus, errorThrown);
        });


        if (!isEmpty(files)) {
            uploader.upload(files[0]).then(data => {
                this.sendAction('complete', data);
            });
        }
    }
});
