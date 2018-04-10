import EmberRoute from '@ember/routing/route';

export default EmberRoute.extend({
    model(params) {
        return this.store.findRecord('work', params.work_id, {include: 'sources'});
    },
    afterModel(model) {
        const author = model.get('author');

        const crumbs = [{
            title: 'Home',
            path: 'index',
            linkable: true
        },
        {
            title: author,
            linkable: false
        }];

        this.set('breadCrumbs', crumbs);
    }
});
