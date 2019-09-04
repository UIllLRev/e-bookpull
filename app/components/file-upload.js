import { isEmpty } from '@ember/utils';
import FileField from 'ember-uploader/components/file-field';
import Uploader from 'ember-uploader/uploaders/uploader';
import config from 'ebookpull/config/environment';

export default FileField.extend({
    attributeBindings: ['type', 'multiple', 'disabled'],
    filesDidChange: function(files) {
        const uploader = Uploader.create({
            url: config.rootURL + "api/2/" + this.get('endpoint') + "/" + this.get('work').get('id')
        });
        uploader.on('progress', e => {
            // eslint-disable-next-line ember/closure-actions
            this.progress(e.percent);
        });
        uploader.on('didError', (jqXHR, textStatus, errorThrown) => {
            // eslint-disable-next-line ember/closure-actions
            this.error(jqXHR, textStatus, errorThrown);
        });


        if (!isEmpty(files)) {
            uploader.upload(files[0]).then(data => {
                // eslint-disable-next-line ember/closure-actions
                this.complete(data);
            });
        }
    }
});
