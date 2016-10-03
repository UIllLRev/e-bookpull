import Ember from 'ember';

export function sourceType(params/*, hash*/) {
    switch (params[0]) {
        case 'B':
            return "Book";
        case 'C':
            return "Case";
        case 'J':
            return "Journal";
        case 'L':
            return "Legislative";
        case 'P':
            return "Periodical";
        case 'M':
            return "Miscellaneous";
        default:
            return "Unknown";
    }
}

export default Ember.Helper.helper(sourceType);
