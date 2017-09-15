const Backbone = require('backbone');

const Project = Backbone.Model.extend({
    defaults: {
        clone_url: null,
        created_at: null,
        default_branch: null,
        description: null,
        empty: null,
        fork: null,
        forks_count: null,
        full_name: null,
        html_url: null, 
        mirror: null, 
        name: null, 
        owner: null, 
        open_issues_count: null, 
        parent: null, 
        permissions: null,
        private: null, 
        size: null, 
        ssh_url: null, 
        stars_count: null, 
        updated_at: null,
        watchers_count: null,
        website: null
    },
    idAttribute: 'id',
    parse: function(response)  {
        const link = `/projects/${response.name}`
        return {
            link: link,
            path: 'projects/',
            clone_url: response.clone_url,
            created_at: response.created_at,
            default_branch: response.default_branch,
            description: response.description,
            empty: response.empty,
            fork: response.fork,
            forks_count: response.forks_count,
            full_name: response.full_name,
            html_url: response.html_url,
            mirror: response.mirror,
            name: response.name, 
            owner: response.owner,
            open_issues_count: response.open_issues_count,
            parent: response.parent,
            permissions: response.permissions,
            private: response.private, 
            size: response.size,
            ssh_url: response.ssh_url, 
            stars_count: response.stars_count, 
            updated_at: response.updated_at,
            watchers_count: response.watchers_count,
            website: response.website,
            directory: true
        };
    }
});

const Projects = Backbone.Collection.extend({
    model: Project,
    url: '/api/v1/user/repos/',
});

module.exports = Projects;
