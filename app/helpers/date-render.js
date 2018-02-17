import { helper } from '@ember/component/helper';

export function dateRender(params/*, hash*/) {
    if (params[0] instanceof Date) {
        return params[0].toLocaleDateString();
    }
  return params;
}

export default helper(dateRender);
