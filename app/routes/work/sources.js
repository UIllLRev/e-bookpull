import EmberRoute from '@ember/routing/route';
import moment from 'moment';

export default EmberRoute.extend({
    model() {
        let work = this.modelFor('work');
        return work.get('sources');
    }
});
