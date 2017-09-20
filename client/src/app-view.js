const Backbone = require('backbone');

const AppView = Backbone.View.extend({
    childView: null,
    template: require('./change-password.ejs'),
    render: function() {
        if (this.childView) {
            this.$el.html(this.childView.render().el);
            this.childView.delegateEvents();
        }
        return this;
    }

});

module.exports = AppView;
