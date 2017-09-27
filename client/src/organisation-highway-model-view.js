const Backbone = require('backbone');
const ProjectsItem = require('./projects-item');

const OrganisationHighwayModelView = Backbone.View.extend({
    tagname: 'ul',
    orgName: null,
    initialize: function(options) {
        this.collection = options.collection;
        this.ProjectsItem
        this.listenTo(this.collection, 'sync', this.collectionSync)
    },
    collectionSync: function() {
        this.$el.append(`<h1>${this.orgName} highway models</h1>`)
        this.collection.each(function(prj) {
            const project = new ProjectsItem({
                model: prj
            });
            this.$el.append(project.render().el)
        }.bind(this));
    }
});

module.exports = OrganisationHighwayModelView;
