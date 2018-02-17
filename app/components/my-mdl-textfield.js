import { scheduleOnce } from '@ember/runloop';
import MdlTextfield from 'ember-material-lite/components/mdl-textfield';

export default MdlTextfield.extend({
    attributeBindings: ['type', 'pattern'],
    // Needed until https://github.com/mike-north/ember-material-lite/pull/94
    // is merged
    didUpdate() {
        scheduleOnce('afterRender', this, () => {
            this.get('_mdlComponent').updateClasses_();
        });
        return this._super(...arguments);
    }
});
