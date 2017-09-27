const Backbone = require('backbone');
const ProjectsItem = require('./projects-item');

const ProjectsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'projectsList list-group col-4',
    initialize: function(options) {
        this.projects = options.projects;
        this.listenTo(this.projects, 'sync', this.projectsSync);
    },

    render: function() {
        this.$el.html('<h3 class="text-center">Highway Models</h3>');
        return this;
    },
    projectsSync: function() {
        this.projects.each(function(prj) {
            const project = new ProjectsItem({
                model: prj
            });
            this.$el.append(project.render().el)
        }.bind(this));
    }
});

module.exports = ProjectsView;
