import Ember from 'ember';

export default Ember.Service.extend({
    confirmDialog: null,
    sourceDialog: null,
    workDialog: null,
    registerConfirmDialog: function(d) {
        this.set('confirmDialog', d);
    },
    registerSourceDialog: function(d) {
        this.set('sourceDialog', d);
    },
    registerWorkDialog: function(d) {
        this.set('workDialog', d);
    },
    showConfirmDialog: function(message, yes_action, no_action, title, yes_message, no_message) {
        if (this.get('confirmDialog')) {
            this.get('confirmDialog').send('show', message, yes_action, no_action, title, yes_message, no_message);
        }
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
