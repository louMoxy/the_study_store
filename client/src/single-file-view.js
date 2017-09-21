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
        const user = this.model.user;
        const dir = this.model.dir;
        const branch = this.model.branch;
        const fileName = this.model.fileName;
        const fileExtension = this.model.fileExtension;
        const fileHistory = `/history/${user}/${dir}/${branch}/${fileName}/${fileExtension}`;
        this.$el.append(this.template({text: this.model.attributes.text, fileHistory: fileHistory}));
        return this;
    }
});

module.exports = FileView;
