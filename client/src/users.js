const Backbone = require('backbone');

const User = Backbone.Model.extend({
    idAttribute: 'id'
});
const Users = Backbone.Collection.extend({
    model: User,
    url: null
});

module.exports = Users;
