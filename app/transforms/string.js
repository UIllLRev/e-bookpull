import DS from 'ember-data';
import { isNone, isEmpty } from '@ember/utils';

export default DS.StringTransform.extend({
  deserialize(serialized) {
    if (isNone(serialized)) {
      return "";
    }
    return String(serialized);
  },

  serialize(deserialized) {
    if (isEmpty(deserialized)) {
      return null;
    }
    return String(deserialized);
  }
});
