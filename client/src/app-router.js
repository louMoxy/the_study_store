const Backbone = require('backbone');

const Router = Backbone.Router.extend({
    app: null,
    initialize: function(options) {
        this.app = options.app;
    },
    routes: {
        '': 'routeDefault',
        'projects/:projectName': 'routeProject',
        'projects': 'routeProjects',
        'file/:dir/:fileName': 'routeSingleFile',
        'create/repo': 'routeCreateRepo'
    },
    routeDefault: function () {
        this.navigate('#/projects');
    },
    routeProjects: function () {
        this.app.routeProjects();
    },
    routeProject: function() {
       this.app.routeProject();
    },
    routeSingleFile: function(dir, fileName) {
        this.app.routeSingleFile(fileName);
    }, 
    routeCreateRepo: function() {
        this.app.routeCreateRepo();
    }
});

module.exports = Router;
