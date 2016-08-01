import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
    author: attr('string'),
    title: attr('string'),
    volume: attr('number'),
    issue: attr('number'),
    comments: attr('string'),
    bookpuller: attr('string'),
    sources: hasMany('source')
});

