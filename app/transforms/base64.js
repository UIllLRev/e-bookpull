import DS from 'ember-data';

export default DS.Transform.extend({
    serialize: function(deserialized) {
      if (deserialized !== null) {
        return {
          "encoding": "base64",
          "data": btoa(deserialized)
        };
      }
      return deserialized;
    },
    deserialize: function(serialized) {
      return serialized;
    }
});
