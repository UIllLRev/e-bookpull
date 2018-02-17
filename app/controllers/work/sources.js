import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
    books: filterBy('model.sources', 'type', 'B'),
    cases: filterBy('model.sources', 'type', 'C'),
    journals: filterBy('model.sources', 'type', 'J'),
    legislative: filterBy('model.sources', 'type', 'L'),
    miscellaneous: filterBy('model.sources', 'type', 'M'),
    periodicals: filterBy('model.sources', 'type', 'P')
});
