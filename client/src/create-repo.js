const Backbone = require('backbone');

const CreateRepo = Backbone.Collection.extend({
    url: '/api/v1/user/repos',
    data: {
        "name": "Hello-World",
        "description": "This is your first repository",
        "private": false
      }
});

module.exports = CreateRepo;