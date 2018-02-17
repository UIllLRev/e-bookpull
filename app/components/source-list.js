import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    dialogService: inject(),
    actions: {
        edit(source) {
            this.get('dialogService').showSourceDialog(source);
            return false;
        }
    }
});
