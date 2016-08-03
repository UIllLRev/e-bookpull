import Ember from 'ember';

export function sourceStatus(params/*, hash*/) {
    switch (params[0]) {
        case 'N':
            return "Not Pulled";
        case 'X':
            return "On Shelf";
        case 'E':
            return "Electronic";
        case 'XP':
            return "Photocopy";
        case 'XR':
            return "Ref Area";
        case 'M':
            return "Missing";
        case 'R':
            return "Returned";
        default:
            return "Unknown";
    }
}

export default Ember.Helper.helper(sourceStatus);
