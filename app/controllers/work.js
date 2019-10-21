import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
    dialogService: inject(),
    actions: {
      add() {
        let work = this.get('model');
        let source = this.get('store').createRecord('source', {
          type: 'B',
          status: 'N',
          work: work
        });
        this.get('dialogService').showSourceDialog(source);
      }
    }
});
