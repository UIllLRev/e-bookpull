import EmberRoute from '@ember/routing/route';

export default EmberRoute.extend({
    model() {
        let work = this.modelFor('work');
        return work.get('sources');
    }
});
