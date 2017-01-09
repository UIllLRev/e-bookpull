import DS from 'ember-data';

export default DS.DateTransform.extend({
    deserialize: function(serialized, options) {
        var struct;
        if ((typeof serialized === 'string') && (struct = /^(\d{4})-(\d{2})-(\d{2})$/.exec(serialized))) {
            // If it's a bare date, create it at midnight local time
            return new Date(struct[1], struct[2] - 1, struct[3]);
        } else {
            return this._super(serialized, options);
        }
    }
});
