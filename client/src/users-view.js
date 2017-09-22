const Backbone = require('backbone');
const ProjectsItem = require('./projects-item');
const UsersItem = require('./users-item');
const $ = require('jquery');

const UsersView = Backbone.View.extend({
    template: require('./userView.ejs'),
    className: 'projectsList',
    initialize: function(options) {
        this.users = options.users;
        this.orgName = options.orgName;
        this.listenTo(this.users, 'sync', this.usersSync);
    },

    render: function() {
        this.$el.html(this.template({orgName: this.orgName}));
        return this;
    },
    usersSync: function() {
        this.users.each(function(prj) {
            const user = new UsersItem({
                model: prj
            });
            $('#userList').append(user.render().el)
        }.bind(this));
    }
});

module.exports = UsersView;
