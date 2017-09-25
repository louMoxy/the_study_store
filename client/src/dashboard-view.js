const Backbone = require('backbone');
const ProjectsView = require('./projects-view');
const OrganisationView = require('./organisations-view');
const Projects = require('./projects');
const Organisations = require('./organisations');

const Dashboard = Backbone.View.extend({
    className: 'd-flex justify-content-between',
    initialize: function(options) {
        this.user= options.user;
        this.projects = new Projects();
        this.organisations = new Organisations();
        this.projectsView = new ProjectsView({
            projects: this.projects
        });
        this.organisationView = new OrganisationView({
            model: this.organisations
        })
    },
    render: function() {
        this.projects.fetch({
            dataType: 'json'
        })
        this.organisations.fetch({
            dataType: 'json'
        })
        this.el.appendChild(this.projectsView.render().el);
        this.el.appendChild(this.organisationView.render().el);
        return this;
    }
});

module.exports = Dashboard;

