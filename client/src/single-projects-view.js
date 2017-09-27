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
        this.highwayModels = options.highwayModels;
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
            owner: this.projects.owner,
            name: this.projects.projectName,
            branch: this.projects.branch
        }));
        this.branches.url = `/api/v1/repos/${this.projects.owner}/${this.projects.projectName}/branches`;
        this.branches.fetch({
            dataType: 'json'
        })
        return this;
    },
    branchChange: function() {
        this.branch= $('#branchSelection').val();
        this.projects.branch = this.branch;
        this.projects.fetch({
            owner: this.projects.owner,
            branch: this.branch,
            user: this.projects.user,
            projectName: this.projects.projectName
        });
        $("#upload-button").attr('href', `/project/upload/${this.projects.projectName}/${this.projects.owner}/${this.branch}`);
    },
    branchesSync: function() {
        $('#col-right').html(this.templateDropdown({branches: this.branches.models, currentModel: this.branch}));
    },
    projectsSync: function() {
        const highwayModel = this.highwayModels.findWhere({name: this.projects.projectName});
        $('#model-name').text(highwayModel.attributes.name);
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
            this.$el.append(`<h3>${highwayModel.attributes.name} repo is empty</h3><br>
                <p>Repo clone: ${highwayModel.attributes.clone_url}</p>`)
        }
    }
});
module.exports = ProjectsView;
