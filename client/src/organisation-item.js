const OrganisationItem = Backbone.View.extend({
    path: null,
    tagName: 'li',
    directory: null,
    template: require('./organisation-item.ejs'),
    initialize: function(options) {
        this.model = options.model;
    },
    render: function() {
        this.$el.append(this.template(this.model.attributes));
        return this;
    }
});

module.exports = OrganisationItem;