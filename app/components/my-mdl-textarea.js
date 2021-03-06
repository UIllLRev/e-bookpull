import { scheduleOnce } from '@ember/runloop';
import MdlTextarea from 'ember-material-lite/components/mdl-textarea';

export default MdlTextarea.extend({
    // Needed until https://github.com/mike-north/ember-material-lite/pull/94
    // is merged
    didUpdate() {
        scheduleOnce('afterRender', this, () => {
            this.get('_mdlComponent').updateClasses_();
        });
        return this._super(...arguments);
    }
});
