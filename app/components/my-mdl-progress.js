import { computed } from '@ember/object';
import MdlProgress from 'ember-material-lite/components/mdl-progress';

export default MdlProgress.extend({
  progress: computed('_progress', {
    get() {
      return this.get('_progress');
    },
    set(key, newVal) {
      this.set('_progress', newVal);
      if (this.element) {
        this._updateProgress();
      }
      return newVal;
    }
  }).volatile(),
});
