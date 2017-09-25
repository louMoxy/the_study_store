const Backbone = require('backbone');
const ProjectsItem = require('./projects-item');
const Branches = require ('./branches');
const $ = require('jquery');

const ProjectsView = Backbone.View.extend({
    template: require('./single-project-view.ejs'),
    templateDropdown: require('./drop-down.ejs'),
    branches: null,
    projects: null,
    branch: 'master',
    initialize: function(options) {
        this.projects = options.projects;
        this.repos = options.repos;
        this.fileExtension= options.fileExtension;
        this.branches = new Branches();
        this.listenTo(this.projects, 'sync', this.projectsSync);
        this.listenTo(this.branches, 'sync', this.branchesSync);
    },
    events: {
        'change #branchSelection': 'branchChange'
    },
    render: function() {
        this.$el.html(this.template({
            name: this.projects.projectName,
            branch: this.projects.branch
        }));
        this.branches.url = `/api/v1/repos/${this.projects.user}/${this.projects.projectName}/branches`;
        this.branches.fetch({
            dataType: 'json'
        })
        return this;
    },
    branchChange: function() {
        this.branch= $('#branchSelection').val();
        this.projects.branch = this.branch;
        this.projects.fetch({
            user: this.projects.user,
            projectName: this.projects.projectName
        });
        $("#upload-button").attr('href', `/projects/${this.projects.projectName}/${this.branch}/upload`);
    },
    branchesSync: function() {
        console.log(this.branch)
        $('#col-right').html(this.templateDropdown({branches: this.branches.models, currentModel: this.branch}));
    },
    projectsSync: function() {
        const repo = this.repos.findWhere({name: this.projects.projectName});
        $('#model-name').text(repo.attributes.name);
        if(this.projects.length !== 0) {
            $('#projectsList').empty();
            this.projects.each(function(prj) {
                // if(prj.attributes.extension === this.fileExtension){
                    const project = new ProjectsItem({
                        model: prj
                    });
                    $('#projectsList').append(project.render().el)
                // }
            }.bind(this));
        } else {
            this.$el.append(`<h3>${repo.attributes.name} repo is empty</h3><br>
                <p>Repo clone: ${repo.attributes.clone_url}</p>`)
        }
    }
});
module.exports = ProjectsView;
