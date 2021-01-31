import DS from 'ember-data';

export default DS.Transform.extend({
    serialize: function(deserialized) {
      return {
        "encoding": "base64",
        "data": btoa(deserialized)
      };
    },
    deserialize: function(serialized) {
      return serialized;
    }
});
