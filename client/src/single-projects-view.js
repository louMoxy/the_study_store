const Backbone = require('backbone');
const ProjectsItem = require('./projects-item');

const ProjectsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'projectsList',
    initialize: function(options) {
        this.projects = options.projects;
        this.repos = options.repos;
        this.listenTo(this.projects, 'sync', this.projectsSync);
    },
    render: function() {
        this.$el.html('');
        return this;
    },
    projectsSync: function() {
        if(this.projects.length !== 0) {
            this.projects.each(function(prj) {
                if(prj.attributes.name.includes('.txt')){
                    const project = new ProjectsItem({
                        model: prj
                    });
                    this.$el.append(project.render().el)
                }
            }.bind(this));
        } else {
            const repo = this.repos.findWhere({name: this.projects.projectName});
            this.$el.append(`<h3>${repo.attributes.name} repo is empty</h3><br>
                <p>Repo clone: ${repo.attributes.clone_url}</p>`)
        }
    }
});
module.exports = ProjectsView;
