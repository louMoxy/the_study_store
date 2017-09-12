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
        const dir = response.TreeLink.split('/moxy/').pop().split('/')[0];
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
    parse: function(response) {
        return JSON.parse(response).data;
    },
    fetch:function(options){
        this.url = `/api/v1/tree/moxy/${options.projectName}`
        options = options || {};
        options.dataType = 'html';
        return Backbone.Collection.prototype.fetch.call(this, options);
    }
});

module.exports = Project;