import EmberRoute from '@ember/routing/route';

export default EmberRoute.extend({
    model(params) {
        return this.store.find('work', params.work_id);
    }
});
