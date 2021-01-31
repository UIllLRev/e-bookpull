import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    type: attr('string'),
    citation: attr('base64'),
    url: attr('string'),
    comments: attr('base64'),
    ordered: attr('date'),
    status: attr('string'),
    work: belongsTo('work')
});
