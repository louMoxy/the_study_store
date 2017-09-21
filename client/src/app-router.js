const Backbone = require('backbone');

const Router = Backbone.Router.extend({
    app: null,
    initialize: function(options) {
        this.app = options.app;
    },
    routes: {
        '': 'routeDefault',
        'projects/:projectName/upload': 'routeUploadFile',
        'projects/:projectName': 'routeProject',
        'projects': 'routeProjects',
        'file/:dir/:branch/:fileName/:extension': 'routeSingleFile',
        'create/repo': 'routeCreateRepo',
        'settings/password-update': 'routeChangePass',
        'login':'routeLogin',
        'history/:user/:repo/:branch/:fileName/:fileExtension':'routeFileHistory'
    },
    routeDefault: function () {
        this.navigate('projects');
    },
    routeProjects: function () {
        this.app.routeProjects();
    },
    routeProject: function(projectName) {
       this.app.routeProject(projectName);
    },
    routeSingleFile: function(dir, branch, fileName, extension) {
        this.app.routeSingleFile(dir, branch, fileName, extension);
    }, 
    routeCreateRepo: function() {
        this.app.routeCreateRepo();
    },
    routeChangePass: function() {
        this.app.routeChangePass();
    },
    routeUploadFile: function(projectName) {
        this.app.routeUploadFile(projectName);
    },
    routeLogin: function(){
        this.app.routeLogin();
    },
    routeFileHistory: function(user, repo, branch,fileName, fileExtension) {
        this.app.routeFileHistory(user, repo, branch,fileName, fileExtension);
    }
});

module.exports = Router;
