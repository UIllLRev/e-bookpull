import Ember from 'ember';
import MdlTextfield from 'ember-material-lite/components/mdl-textfield';

export default MdlTextfield.extend({
    // Needed until https://github.com/mike-north/ember-material-lite/pull/94
    // is merged
    didUpdate() {
        Ember.run.scheduleOnce('afterRender', this, () => {
            this.get('_mdlComponent').updateClasses_();
        });
        return this._super(...arguments);
    },
    type: 'date',
    date: Ember.computed('value', {
        get(key) {
            try {
                var d = new Date(this.get('value'));
                if (Object.prototype.toString.call(d) === '[object Date]' && isFinite(d)) {
                        d = new Date(d.valueOf() + d.getTimezoneOffset() * 60000);
                        if (Object.prototype.toString.call(d) === '[object Date]' && isFinite(d)) {
                            return d;
                        }
                }
            } catch (RangeError) {
            }

            return null;
        },
        set(key, date) {
            if (date) {
                this.set('value',
                    new Date(date.valueOf() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 10));
            }
            return date;
        }
    })
});
