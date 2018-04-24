import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
    books: filterBy('model', 'type', 'B'),
    cases: filterBy('model', 'type', 'C'),
    journals: filterBy('model', 'type', 'J'),
    legislative: filterBy('model', 'type', 'L'),
    miscellaneous: filterBy('model', 'type', 'M'),
    periodicals: filterBy('model', 'type', 'P')
});
