import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    type: attr('string'),
    citation: attr('string'),
    url: attr('string'),
    comments: attr('string'),
    ordered: attr('date'),
    status: attr('string'),
    work: belongsTo('work')
});
