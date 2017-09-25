const Backbone = require('backbone');

const Router = Backbone.Router.extend({
    app: null,
    initialize: function(options) {
        this.app = options.app;
    },
    routes: {
        '': 'routeDefault',
        'dashboard' : 'routeDashboard',
        'projects/:projectName/upload': 'routeUploadFile',
        'projects/:projectName': 'routeProject',
        'file/:dir/:branch/:fileName/:extension': 'routeSingleFile',
        'create/repo': 'routeCreateRepo',
        'settings/password-update': 'routeChangePass',
        'login':'routeLogin',
        'history/:user/:repo/:branch/:fileName/:fileExtension':'routeFileHistory',
        'org/:orgName/add':'routeAddUserOrg',
        'org/:orgName':'routeOrganisation',
        'sign-up': 'routeSignUp'
    },
    routeDefault: function () {
        this.navigate('dashboard');
    },
    routeDashboard: function() {
        this.app.routeDashboard();
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
    },
    routeAddUserOrg: function(orgName) {
        this.app.routeAddUserOrg(orgName);
    },
    routeOrganisation: function(orgName) {
        this.app.routeOrganisation(orgName);
    },
    routeSignUp: function() {
        this.app.routeSignUp();
    }
});

module.exports = Router;
