import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    breadCrumbs: computed('model.author', function() {
        return [{label: "Home", path:"index"}, {label: this.get('model').get('author'), path: false}];
    })
});
