import DS from 'ember-data';

export default DS.DateTransform.extend({
  deserialize: function(serialized) {
    if (serialized instanceof Date) {
      return serialized.toISOString().slice(0,10);
    } else if (typeof serialized === 'string') {
      return serialized;
    } else {
      return '';
    }

  },
  serialize: function(deserialized) {
    if (deserialized instanceof Date) {
      return deserialized.toISOString().slice(0,10);
    } else if (typeof deserialized === 'string') {
      return deserialized;
    } else {
      return null;
    }
  }
});
