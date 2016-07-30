import Ember from 'ember';

export default Ember.Service.extend({
    workDialog: null,
    registerWorkDialog: function(d) {
        this.set('workDialog', d);
    },
    showWorkDialog: function(work) {
        if (this.get('workDialog')) {
            this.get('workDialog').send('show', work);
        }
    }
});
