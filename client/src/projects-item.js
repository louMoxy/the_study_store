const ProjectsItem = Backbone.View.extend({
    path: null,
    tagName: 'li',
    className: "list-group-item",
    directory: null,
    template: require('./project.ejs'),
    initialize: function(options) {
        this.model = options.model;
    },
    render: function() {
        this.$el.append(this.template(this.model.attributes));
        return this;
    }
});

module.exports = ProjectsItem;