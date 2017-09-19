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
        'file/:dir/:fileName': 'routeSingleFile',
        'create/repo': 'routeCreateRepo',
        'settings/password-update': 'routeChangePass'
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
    routeSingleFile: function(dir, fileName) {
        this.app.routeSingleFile(dir, fileName);
    }, 
    routeCreateRepo: function() {
        this.app.routeCreateRepo();
    },
    routeChangePass: function() {
        this.app.routeChangePass();
    },
    routeUploadFile: function(projectName) {
        this.app.routeUploadFile(projectName);
    }
});

module.exports = Router;
