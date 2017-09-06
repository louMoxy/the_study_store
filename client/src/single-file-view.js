const Backbone = require('backbone');

const FileView = Backbone.View.extend({
    template: require('./file.ejs'),
    initialize: function(options) {
        this.listenTo(this.model, 'sync', this.modelSync)
    },
    render: function() {
        this.$el.html('');
        return this;
    },
    modelSync: function() {
        this.$el.append(this.template({text: this.model.attributes.text}));
        return this;
    }
});

module.exports = FileView;
