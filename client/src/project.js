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
        const extension = response.name.split('.').pop();
        const fileStringName = encodeURIComponent(response.name.slice(0, `-${extension.length +1}`));
        return {
            extension: extension,
            dir: dir,
            link: `/file/${username[1]}/${dir}/${response.commit}/${fileStringName}/${extension}`,
            TreeLink: response.TreeLink,
            IsSubModule: response.IsSubModule, 
            directory: response.isDir,
            item: response.item,
            jumpPathName: response.jumpPathName,
            name: response.name,
            commit: response.commit,
            owner: username[1]
        }
    }
});

const Project = Backbone.Collection.extend({
    model: Prj, 
    url: null,
    user: null,
    branch: 'master',
    parse: function(response) {
        const dataJson = JSON.parse(response);
        const data = dataJson.data;
        data.forEach(prj => {
            prj.commit = dataJson.latest;
        })
        return data;
    },
    fetch:function(options){
        this.owner = options.owner;
        this.projectName = options.projectName;
        this.branch = options.branch || 'master';
        this.url = `/api/v1/tree/${this.owner}/${options.projectName}/src/${this.branch}`
        options = options || {};
        options.dataType = 'html';
        return Backbone.Collection.prototype.fetch.call(this, options);
    },
});

module.exports = Project;