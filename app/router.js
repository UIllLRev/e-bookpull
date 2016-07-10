import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('work', { path: 'work/:work_id' }, function() {
    this.route('edit');
    this.route('sources');
    this.route('source', { path: 'source/:source_id' });
  });
  this.route('add_work');
});

export default Router;
