const Backbone = require('backbone');
const $ = require('jquery');
const AppView = require('./app-view');
const Router = require('./app-router');
const ProjectsView = require('./projects-view');
const SingleProjectsView = require('./single-projects-view');
const Projects = require('./projects');
const Project = require('./project');
const File = require('./file');
const SingleFileView = require('./single-file-view');
const CreateRepoView = require('./create-repo-view');
const ChangePasswordView = require('./change-password-view');

const App = Backbone.Model.extend({
    router: null,
    user: null,
    init: function() {
        this.user = 'moxy';
        this.csrf = 'Pgu6uX4qlgAedDWW2gdPAL0IvoE6MTUwNTQ2MjQzMTgxNTgwMDEwMA==';
        const auth = btoa(`${this.user}:tester`);
        this.fileExtension= 'txt';
        $.ajaxSetup({
            headers: {
                'Authorization': `Basic ${auth}`,
                "_csrf": this.csrf
            }
        });
        this.createRepoView = new CreateRepoView({
            csrf: this.csrf
        });
        this.changePasswordView = new ChangePasswordView({
            csrf: this.csrf
        });
        this.projects = new Projects();
        this.projects.fetch({
            dataType: 'json',
        })
        this.file = new File({user: this.user});
        this.project = new Project();
        this.singleProject = new Project();
        this.appView = new AppView({ el: document.querySelector('section.mainContent') });
        this.projectsView = new ProjectsView({
            projects: this.projects
        });
        this.singleProjectsView = new SingleProjectsView({
            repos: this.projects,
            projects: this.singleProject,
            fileExtension: this.fileExtension
        });
        this.singleFileView = new SingleFileView({
            model: this.file
        });
        this.router = new Router({ app: this });
        Backbone.history.start({ pushState: true });
    },
    routeProjects: function () {
        this.appView.childView = this.projectsView;
        this.appView.render();
    },
    routeProject: function (projectName) {
        this.singleProject.fetch({projectName: projectName, user: this.user});
        this.appView.childView = this.singleProjectsView;
        this.appView.render();
    },
    routeSingleFile: function(dir, fileName) {
        this.file.fetch({
            dir: dir, 
            fileName: fileName,
            fileExtension: this.fileExtension
        });
        this.appView.childView = this.singleFileView;
        this.appView.render();
    },
    routeCreateRepo: function() {
        this.appView.childView = this.createRepoView;
        this.appView.render();
    },
    routeChangePass: function() {
        this.appView.childView = this.changePasswordView;
        this.appView.render();
    }
});

module.exports = App;
