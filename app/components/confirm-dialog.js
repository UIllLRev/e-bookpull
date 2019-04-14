import Component from '@ember/component';

export default Component.extend({
    message: 'Are you sure?',
    title: 'Confirm',
    yes_action: null,
    no_action: null,
    yes_message: 'Yes',
    no_message: 'No',
    didInsertElement() {
        var dialog = this.element;
        if (! dialog.showModal) {
            // eslint-disable-next-line no-undef
            //dialogPolyfill.registerDialog(dialog);
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

           var dialog = this.element;
           dialog.showModal();
       },
       yes: function() {
           // eslint-disable-next-line ember/closure-actions
           this.sendAction('yes_action');
           var dialog = this.element;
           dialog.close();
       },
       no: function() {
           // eslint-disable-next-line ember/closure-actions
           this.sendAction('no_action');
           var dialog = this.element;
           dialog.close();
       }
   }
});
