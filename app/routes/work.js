import EmberRoute from '@ember/routing/route';

export default EmberRoute.extend({
    model(params) {
        return this.store.findRecord('work', params.work_id);
    },
    afterModel(model) {
        const author = model.get('author');
        this.controllerFor('application').set('isWorkRoute', true);
        this.controllerFor('application').set('title', author);
    }
});
