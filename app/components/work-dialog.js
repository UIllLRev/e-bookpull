import Ember from 'ember';

export default Ember.Component.extend({
    dialogService: Ember.inject.service(),
    didInsertElement() {
        var dialog = this.$('dialog').get(0);
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        this.get('dialogService').registerWorkDialog(this);
    },
    actions: {
        show: function(work) {
            this.set('model', work);
            var dialog = this.$('dialog').get(0);
            dialog.showModal();
        },
        save: function() {
            this.get('model').save();
            var dialog = this.$('dialog').get(0);
            dialog.close();
        },
        close: function() {
            var dialog = this.$('dialog').get(0);
            dialog.close();
        }
    }
});
