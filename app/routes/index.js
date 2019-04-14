import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.store.findAll('work');
    },
    afterModel() {
      this.controllerFor('application').set('isWorkRoute', false);
      this.controllerFor('application').set('title', 'University of Illinois Law Review—E-Bookpull System');
    }
});
