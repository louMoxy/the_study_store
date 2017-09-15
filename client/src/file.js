const Backbone = require('backbone');
const $ = require('jquery');

const File = Backbone.Model.extend({
    url: null,
    fileExtension: null,
    initialize: function(options) {
        this.user = options.user;
    },
    fetch: function(options){
        options = options || {};
        this.dir = options.dir;
        this.fileName = options.fileName;
        this.branch = 'master';
        options.dataType = 'text';
        this.fileExtension = options.fileExtension;
        this.fullFilename = this.fileName.replace(`${this.fileExtension}`, `.${this.fileExtension}`);
        this.url = `/api/v1/repos/${this.user}/${this.dir}/raw/${this.branch}/${this.fullFilename}`;
        return Backbone.Model.prototype.fetch.call(this, options);
    },
    parse: function(response) {
        if(response.length === 0) {
            response = 'This file is empty';
        }
        return {text: response};
    }
});

module.exports = File;