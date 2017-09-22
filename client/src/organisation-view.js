const Backbone = require('backbone');
const OrganisationHighwayModelView  = require('./organisation-highway-model-view');;
const Users = require('./users');
const UsersView = require('./users-view');
const OrganisationView = Backbone.View.extend({
    orgName: null,
    organisationHighwayModelView: null,
    usersView: null,
    initialize: function() {
        this.organisationHighwayModelView = new OrganisationHighwayModelView({
            csrf: this.csrf,
            collection: this.model
        });
        this.users = new Users();
    },
    render: function() {
        this.$el.html('');
        this.organisationHighwayModelView.orgName = this.orgName;
        this.model.url= `/api/v1/orgs/${this.orgName}/repos`;
        this.model.fetch({
            dataType: 'json'
        })
        this.users.url =`/api/v1/orgs/${this.orgName}/members`;
        this.users.fetch();
        this.usersView = new UsersView({
            users: this.users,
            orgName: this.orgName
        });
        this.el.appendChild(this.organisationHighwayModelView.render().el);
        this.el.appendChild(this.usersView.render().el);
        return this;
    }
});

module.exports = OrganisationView;

