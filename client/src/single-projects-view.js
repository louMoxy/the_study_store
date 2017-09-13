const Backbone = require('backbone');
const ProjectsItem = require('./projects-item');

const ProjectsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'projectsList',
    initialize: function(options) {
        this.projects = options.projects;
        this.listenTo(this.projects, 'sync', this.projectsSync)
    },
    render: function() {
        this.$el.html('');
        return this;
    },
    projectsSync: function() {
        if(this.projects.length !== 0) {
            this.projects.each(function(prj) {
                if(prj.attributes.name.includes('.md')){
                    const project = new ProjectsItem({
                        model: prj
                    });
                    this.$el.append(project.render().el)
                }
            }.bind(this));
        } else {
            this.$el.append('<h3>This repo is empty</h3>')
        }
    }
});

module.exports = ProjectsView;
