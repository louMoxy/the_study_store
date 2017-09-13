const Backbone = require('backbone');
const $ = require('jquery');

const Prj = Backbone.Model.extend({
    idAttribute: 'id',
    defaults: {
        IsSubModule: null, 
        isDir: null,
        item: null,
        jumpPathName: null,
        name: null
    },
    parse: function(response){
        const dir = response.TreeLink.split(`/${response.user}/`).pop().split('/')[0];
        return {
            link: `#/file/${dir}/${response.name}`,
            TreeLink: response.TreeLink,
            IsSubModule: response.IsSubModule, 
            directory: response.isDir,
            item: response.item,
            jumpPathName: response.jumpPathName,
            name: response.name,
        }
    }
});

const Project = Backbone.Collection.extend({
    model: Prj, 
    url: null,
    user: null,
    parse: function(response) {
        const data = JSON.parse(response).data;
        data[0].user = this.user;
        return data;
    },
    fetch:function(options){
        this.user = options.user;
        this.url = `/api/v1/tree/${this.user}/${options.projectName}`
        options = options || {};
        options.dataType = 'html';
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
});

module.exports = Project;