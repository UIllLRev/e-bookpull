import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
    namespace: 'members/bookpull/api/2',
    buildQuery(snapshot) {
        let query = {};
        if (snapshot) {
            let { include } = snapshot;

            if (include) {
                query.include = include;
            }
        }
        query.page = { size: 0 };
        return query;
    },
    findHasMany(store, snapshot, url, relationship) {
        return this._super(store, snapshot, url + "?" + encodeURIComponent("page[size]") + "=0", relationship);
    }
});
