import Ember from 'ember';

export default Ember.Service.extend({
    sourceDialog: null,
    workDialog: null,
    registerSourceDialog: function(d) {
        this.set('sourceDialog', d);
    },
    registerWorkDialog: function(d) {
        this.set('workDialog', d);
    },
    showSourceDialog: function(source) {
        if (this.get('sourceDialog')) {
            this.get('sourceDialog').send('show', source);
        }
    },
    showWorkDialog: function(work) {
        if (this.get('workDialog')) {
            this.get('workDialog').send('show', work);
        }
    }
});
