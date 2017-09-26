const Backbone = require('backbone');
const $ = require('jquery');

const File = Backbone.Model.extend({
    url: null,
    fileExtension: null,
    initialize: function(options) {
        this.app = options.app;
    },
    fetch: function(options){
        this.user = options.user;
        options = options || {};
        this.dir = options.dir;
        this.fullFilename = options.fileName;
        this.branch = options.branch;
        this.owner = options.owner;
        options.dataType = 'text';
        this.fileExtension = options.fileExtension;
        this.fileName = this.fullFilename.replace(`${this.fileExtension}`, `.${this.fileExtension}`);
        this.url = `/api/v1/repos/${this.owner}/${this.dir}/raw/${this.branch}/${this.fileName}.${this.fileExtension}`;
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