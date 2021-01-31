import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
    author: attr('string'),
    title: attr('base64'),
    volume: attr('number'),
    issue: attr('number'),
    comments: attr('base64'),
    bookpuller: attr('string'),
    sources: hasMany('source')
});

