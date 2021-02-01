import DS from 'ember-data';

export default DS.Transform.extend({
    serialize: function(deserialized) {
      if (deserialized !== null) {
        return {
          "encoding": "base64",
          "data": btoa(encodeURIComponent(deserialized).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)))
        };
      }
      return deserialized;
    },
    deserialize: function(serialized) {
      return serialized;
    }
});
