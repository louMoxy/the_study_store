const Backbone = require('backbone');

const AppMenu = Backbone.View.extend({
    tagname: 'header',
    template: require('./app-menu.ejs'), // external template
    loggedInTemplate: require('./logged-in-header.ejs'),
    user: null,
    initialize: function(options) {
        this.render();
    },
    render: function() {
        this.$el.empty().append(this.template({user: this.user}));
        return this;
    },
    loggedIn: function(user, avatar) {
        this.$el.append(this.loggedInTemplate({user: user, avatar: avatar}))
    }
});

module.exports = AppMenu;

