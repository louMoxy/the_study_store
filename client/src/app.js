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
const UploadFileview = require('./upload-file-view');
const LoginView = require('./login-view');
const loginMessage = require('./not-logged-in.ejs');

const App = Backbone.Model.extend({
    router: null,
    user: null,
    csrf: null,
    auth: null,
    init: function() {
        this.getUserName();
    },
    getUserName: function() {
        const self = this;
        const request = new Request('/api/v1/user/', {
            mode: 'cors',
            credentials: 'same-origin',
        });
        fetch(request)
            .then(response =>{
                return response.json();
            })
            .then(obj => {
                this.user = obj.login;
                this.createAuth();
                $('.warning-info').html('')
            })
            .catch(function(error) {
                if(!document.URL.includes('/login')) {
                    $('.warning-info').html(loginMessage)
                } else {
                    self.createViews();
                }
                });
    },
    createAuth: function() {
        const self = this;
        this.fileExtension= 'txt';
        this.auth = btoa(`${this.user}:tester`);
        fetch(new Request('http://localhost:8080/api/v1/tree/swagger') )
            .then(response => {
                return response.text();
            }).then (text => {
                return self.csrf =text.substring(text.lastIndexOf('value="')+7,text.lastIndexOf('"'));
            }).then( ()=> {
                $.ajaxSetup({
                    headers: {
                        'Authorization': `Basic ${this.auth}`,
                        "_csrf": self.csrf
                    }
                });
            });
            this.createViews();
    },
    createViews: function() {
        this.projects = new Projects();
        this.projects.fetch({
            dataType: 'json'
        })
        this.createRepoView = new CreateRepoView({
            csrf: this.csrf
        });
        this.uploadFileview = new UploadFileview({
            user: this.user
        });
        this.changePasswordView = new ChangePasswordView({
            csrf: this.csrf
        });
        this.file = new File({user: this.user});
        this.project = new Project();
        this.singleProject = new Project();
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
        this.loginView = new LoginView({
            csrf: this.csrf,
            app: this
        });
        this.appView = new AppView({ el: document.querySelector('section.mainContent') });
        this.router = new Router({ app: this });
        if(!Backbone.History.started){
            Backbone.history.start({ pushState: true });
        }
    },
    routeProjects: function () {
        this.appView.childView = this.projectsView;
        this.appView.render();
    },
    routeProject: function (projectName) {
        this.singleProject.fetch({
            projectName: projectName,
            user: this.user});
        this.appView.childView = this.singleProjectsView;
        this.appView.render();
    },
    routeSingleFile: function(dir, fileName) {
        this.file.fetch({
            dir: dir, 
            fileName: fileName,
            fileExtension: this.fileExtension,
            user: this.user
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
    },
    routeUploadFile: function(projectName) {
        this.appView.childView = this.uploadFileview;
        this.uploadFileview.projectName = projectName;
        this.appView.render();
    },
    routeLogin: function() {
        this.appView.childView =  this.loginView;
        this.appView.render();
    }
});

module.exports = App;
