import { scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
import MdlTextfield from 'ember-material-lite/components/mdl-textfield';

export default MdlTextfield.extend({
    // Needed until https://github.com/mike-north/ember-material-lite/pull/94
    // is merged
    didUpdate() {
        scheduleOnce('afterRender', this, () => {
            this.get('_mdlComponent').updateClasses_();
        });
        return this._super(...arguments);
    },
    type: 'date',
    date: computed('value', {
        get() {
            try {
                // Create Date at midnight local time
                var struct = /^(\d{4})-(\d{2})-(\d{2})$/.exec(this.get('value'));
                return new Date(struct[1], struct[2] - 1, struct[3]);
            } 
            // eslint-disable-next-line no-empty
            catch (RangeError) {
            }

            return null;
        },
        set(key, date) {
            if (date) {
                // This is a bit of hack - we need the YYYY-mm-dd format in local time. So we remove the offset and
                // then call toISOString, which is in UTC.
                this.set('value',
                    new Date(date.valueOf() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 10));
            }
            return date;
        }
    })
});
