import Ember from 'ember';

export default Ember.Component.extend({
    dialogService: Ember.inject.service(),
    didInsertElement() {
        var dialog = this.$('dialog').get(0);
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        this.get('dialogService').registerSourceDialog(this);
    },
    actions: {
        uploadComplete: function(url) {
            this.get('model').set('url', url);
        },
        show: function(work) {
            var dialog = this.$('dialog').get(0);
            this.set('model', work);
            dialog.showModal();
        },
        save: function() {
            var dialog = this.$('dialog').get(0);
            this.get('model').save().then(() => {
                dialog.close();
            });
        },
        close: function() {
            var dialog = this.$('dialog').get(0);
            this.get('model').rollbackAttributes();
            dialog.close();
        }
    },
    statuses: ['X', 'E', 'XP', 'XR', 'M', 'R']
});
