const Backbone = require('backbone');
const $ = require('jquery');

function decodeHtml(html) {
    return $('<div>').html(html).text();
}

const SingleCommit = Backbone.Model.extend({
    parse: function(response, options){
        return {
            id: response.ID,
            summary: decodeHtml(response.Summary),
            email: response.authorEmail,
            authorName: response.authorName,
            authorWhen: new Date(decodeHtml(response.authorWhen).split('+')[0]),
            userFullName: response.userFullName,
            highwayModel: options.highwayModel,
            branch: options.branch,
            fileName: options.fileName,
            fileExtension: options.fileExtension
        }
    }
});

const Commits = Backbone.Collection.extend({
    model: SingleCommit, 
    url: null,
    user: null,
    parse: function(response) {
        return response.commits;
    },
    fetch:function(options){
        this.url = `/api/v1/tree/${options.username}/${options.highwayModel}/commits/${options.branch}/${options.fileName}.${options.fileExtension}`
        options = options || {};
        options.dataType = 'JSON';
        return Backbone.Collection.prototype.fetch.call(this, options);
    },
});

const FileHistroyView = Backbone.View.extend({
    properties: [],
    template: require('./file-history.ejs'),
    initialize: function(options) {
        this.collection = options.collection;
        this.listenTo(this.collection, 'sync', this.collectionSync)
    },
    render: function() {
        this.$el.html('');
        this.collection.fetch({
            username: this.properties.user,
            highwayModel: this.properties.repo,
            branch: this.properties.branch,
            fileName: this.properties.fileName,
            fileExtension: this.properties.fileExtension
        });
        return this;
    },
    collectionSync: function() {
        const fileLink = `/api/v1/repos/${this.collection.username}/${this.collection.highwayModel}/raw/${this.collection.branch}/${this.collection.fileName}.${this.collection.fileExtension}`;
        this.$el.append(this.template({collection: this.collection, fileLink: fileLink}));
        return this;
    }
});

module.exports = {FileHistroyView, Commits};