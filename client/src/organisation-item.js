const OrganisationItem = Backbone.View.extend({
    path: null,
    tagName: 'li',
    className: 'row p-4' ,
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