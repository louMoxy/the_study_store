const Backbone = require('backbone');
const OrganisationItem = require('./organisation-item');

const OrganisationsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'OrganisationsList',
    initialize: function(options) {
        this.listenTo(this.model, 'sync', this.projectsSync);
    },

    render: function() {
        this.$el.html('<h1>Organisations</h1>');
        return this;
    },
    projectsSync: function() {
        this.model.each(function(org) {
            const organisation = new OrganisationItem({
                model: org
            });
            this.$el.append(organisation.render().el)
        }.bind(this));
    }
});

module.exports = OrganisationsView;
