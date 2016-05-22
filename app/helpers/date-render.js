import Ember from 'ember';

export function dateRender(params/*, hash*/) {
    if (params[0] instanceof Date) {
        return params[0].toLocaleDateString();
    }
  return params;
}

export default Ember.Helper.helper(dateRender);
