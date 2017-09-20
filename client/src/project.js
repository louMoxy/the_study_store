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
        const username = response.TreeLink.split('/');
        const dir = response.TreeLink.split(`/${username[1]}/`).pop().split('/')[0];
        return {
            extension: response.name.split('.')[1],
            dir: dir,
            link: `/file/${dir}/${response.name.split('.')[0]}/${response.name.split('.')[1]}`,
            TreeLink: response.TreeLink,
            IsSubModule: response.IsSubModule, 
            directory: response.isDir,
            item: response.item,
            jumpPathName: response.jumpPathName,
            name: response.name
        }
    }
});

const Project = Backbone.Collection.extend({
    model: Prj, 
    url: null,
    user: null,
    parse: function(response) {
        const data = JSON.parse(response).data;
        return data;
    },
    fetch:function(options){
        this.user = options.user;
        this.projectName = options.projectName;
        this.url = `/api/v1/tree/${this.user}/${options.projectName}`
        options = options || {};
        options.dataType = 'html';
        return Backbone.Collection.prototype.fetch.call(this, options);
    },
});

module.exports = Project;