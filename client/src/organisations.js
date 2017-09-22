const Backbone = require('backbone');

const Organisation = Backbone.Model.extend({
    idAttribute: 'id'
});

const Organisations = Backbone.Collection.extend({
    model: Organisation,
    url: '/api/v1/user/orgs'
});

module.exports = Organisations;
