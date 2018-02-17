import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    dialogService: inject(),
    message: 'Are you sure?',
    title: 'Confirm',
    yes_action: null,
    no_action: null,
    yes_message: 'Yes',
    no_message: 'No',
    didInsertElement() {
        var dialog = this.$('dialog').get(0);
        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        this.get('dialogService').registerConfirmDialog(this);
    },
   actions: {
       show: function(message, yes_action, no_action, title, yes_message, no_message) {
           var props = {};
           if (message)
               props['message'] = message;
           if (yes_action)
               props['yes_action'] = yes_action;
           if (no_action)
               props['no_action'] = no_action;
           if (title)
               props['title'] = title;
           if (yes_message)
               props['yes_message'] = yes_message;
           if (no_message)
               props['no_message'] = no_message;
           this.setProperties(props);

           var dialog = this.$('dialog').get(0);
           dialog.showModal();
       },
       yes: function() {
           this.sendAction('yes_action');
           var dialog = this.$('dialog').get(0);
           dialog.close();
       },
       no: function() {
           this.sendAction('no_action');
           var dialog = this.$('dialog').get(0);
           dialog.close();
       }
   }
});
