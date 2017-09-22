const Backbone = require('backbone');
const ProjectsItem = require('./projects-item');

const ProjectsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'projectsList',
    initialize: function(options) {
        this.projects = options.projects;
        this.repos = options.repos;
        this.fileExtension= options.fileExtension;
        this.listenTo(this.projects, 'sync', this.projectsSync);
    },
    render: function() {
        this.$el.html('');
        return this;
    },
    projectsSync: function() {
        const repo = this.repos.findWhere({name: this.projects.projectName});
        if(this.projects.length !== 0) {
            this.$el.append(`<h1>${repo.attributes.name}</h1>`);
            this.projects.each(function(prj) {
                // if(prj.attributes.extension === this.fileExtension){
                    const project = new ProjectsItem({
                        model: prj
                    });
                    this.$el.append(project.render().el)
                // }
            }.bind(this));
            this.$el.after(`<a href="/projects/${repo.attributes.name}/upload"><button class="btn btn-dark">Add new file</button></a>`)
        } else {
            this.$el.append(`<h3>${repo.attributes.name} repo is empty</h3><br>
                <p>Repo clone: ${repo.attributes.clone_url}</p>`)
        }
    }
});
module.exports = ProjectsView;
