import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
    payloadKeyFromModelName: function(modelName) {
        return modelName;
    }
});
