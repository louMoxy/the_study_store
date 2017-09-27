const Backbone = require('backbone');

const Branch = Backbone.Model.extend();

const Branches = Backbone.Collection.extend({
    model: Branch
});

module.exports = Branches;
