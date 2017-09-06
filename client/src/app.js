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
const LoginView = require('./login');
const CreateRepoView = require('./create-repo-view');

const App = Backbone.Model.extend({
    router: null,
    init: function() {
        const auth = btoa('Moxy:isynch');
        $.ajaxSetup({
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });
        this.createRepoView = new CreateRepoView();
        this.projects = new Projects();
        this.projects.fetch({
            dataType: 'json',
        })
        this.file = new File();
        this.project = new Project();
        this.project.fetch();
        this.appView = new AppView({ el: document.querySelector('section.mainContent') });
        this.projectsView = new ProjectsView({
            projects: this.projects
        });
        this.singleProjectsView = new SingleProjectsView({
            projects: this.project
        });
        this.singleFileView = new SingleFileView({
            model: this.file
        });
        this.loginView = new LoginView({
            model: this.file
        });
        this.router = new Router({ app: this });
        Backbone.history.start();
    },
    routeProjects: function () {
        this.appView.childView = this.projectsView;
        this.appView.render();
    },
    routeProject: function () {
        this.appView.childView = this.singleProjectsView;
        this.appView.render();
    },
    routeSingleFile: function(fileName) {
        this.file.fetch({fileName: fileName});
        this.appView.childView = this.singleFileView;
        this.appView.render();
    },
    routeCreateRepo: function() {
        this.appView.childView = this.createRepoView;
        this.appView.render();
    }
});



module.exports = App;
