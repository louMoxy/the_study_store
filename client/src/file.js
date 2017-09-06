const Backbone = require('backbone');
const $ = require('jquery');

const File = Backbone.Model.extend({
    url: null,
    fetch: function(options){
        options = options || {};
        options.dataType = 'text';
        this.url = `/api/v1/repos/moxy/master/raw/master/${options.fileName}`;
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