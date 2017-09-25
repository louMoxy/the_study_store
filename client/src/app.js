const Backbone = require('backbone');
const $ = require('jquery');
const AppView = require('./app-view');
const AppMenu = require('./app-menu');
const Router = require('./app-router');
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
const FileHistroyView = require('./file-history-view').FileHistroyView;
const Commits = require('./file-history-view').Commits;
const AddUserOrg = require('./add-user-org-view');
const OrganisationView  = require('./organisation-view');
const DashboardView  = require('./dashboard-view');
const SignUpView = require('./user-sign-up');

const App = Backbone.Model.extend({
    router: null,
    user: null,
    csrf: null,
    auth: null,
    avatar: null,
    init: function() {
        this.appMenu = new AppMenu({ el: document.querySelector('header') });
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
                this.avatar = obj.avatar_url;
                this.createAuth();
                $('.warning-info').html('')
            })
            .catch(function(error) {
                if(!document.URL.includes('/login') && !document.URL.includes('/sign-up')) {
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
                this.createViews();
            });
    },
    createViews: function() {
        this.appMenu.loggedIn(this.user, this.avatar );
        this.dashboardView = new DashboardView({
            user: this.user
        });
        this.signUpView = new SignUpView({
            csrf: this.csrf,
            app: this
        });
        this.projects = new Projects();
        this.projects.fetch({
            dataType: 'json'
        })
        this.createRepoView = new CreateRepoView({
            app: this,
            csrf: this.csrf,
        });
        this.uploadFileview = new UploadFileview({
            user: this.user,
            app: this
        });
        this.commits = new Commits({
            user: this.user
        });
        this.fileHistroyView = new FileHistroyView({
            collection: this.commits
        });
        this.changePasswordView = new ChangePasswordView({
            csrf: this.csrf
        });
        this.addUserOrg = new AddUserOrg({
            csrf: this.csrf,
            app: this
        });
        this.file = new File({user: this.user});
        this.project = new Project();
        this.singleProject = new Project();
        this.orgHighwayModel = new Projects();
        this.organisationView = new OrganisationView({
            model: this.orgHighwayModel
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
    routeProject: function (projectName, branch, owner) {
        this.singleProject.fetch({
            branch: branch,
            projectName: projectName,
            owner: owner});
        this.singleProjectsView.branch = branch;
        this.appView.childView = this.singleProjectsView;
        this.appView.render();
    },
    routeSingleFile: function(dir, branch, fileName, extension) {
        this.file.fetch({
            dir: dir,
            branch: branch,
            fileName: fileName,
            fileExtension: extension,
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
    routeUploadFile: function(projectName, branch) {
        this.appView.childView = this.uploadFileview;
        this.uploadFileview.projectName = projectName;
        this.uploadFileview.branch = branch;
        this.appView.render();
    },
    routeLogin: function() {
        this.appView.childView =  this.loginView;
        this.appView.render();
    },
    routeAddUserOrg: function(orgName) {
        this.addUserOrg.orgName= orgName;
        this.appView.childView =  this.addUserOrg;
        this.appView.render();
    },
    routeOrganisation: function(orgName) {
        this.organisationView.orgName = orgName;
        this.appView.childView =  this.organisationView;
        this.appView.render();
    },
    routeDashboard: function() {
        this.appView.childView =  this.dashboardView;
        this.appView.render();
    },
    routeSignUp: function() {
        this.appView.childView = this.signUpView;
        this.appView.render();
    },
    routeFileHistory: function(user, repo, branch,fileName, fileExtension) {
        this.fileHistroyView.properties =  {
            user: user, 
            repo: repo, 
            branch: branch,
            fileName: fileName, 
            fileExtension: fileExtension
        }
        this.appView.childView =  this.fileHistroyView;
        this.appView.render();
    }
});

module.exports = App;
