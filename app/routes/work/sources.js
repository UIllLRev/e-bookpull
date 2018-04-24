import EmberRoute from '@ember/routing/route';

export default EmberRoute.extend({
    breadCrumb: null,
    model() {
        let work = this.modelFor('work');
        return work.get('sources');
    }
});
