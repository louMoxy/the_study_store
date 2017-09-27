const Backbone = require('backbone');
const $ = require('jquery');
const Organisations = require('./organisations');

const CreateRepoView = Backbone.View.extend({
    template: require('./create-repo.ejs'),
    initialize: function(options) {
        this.csrf = options.csrf;
        this.app = options.app;
        this.organisations = new Organisations();
        this.listenTo(this.organisations, 'sync', this.organisationsSync);
    },
    events: {
        'submit' : "formSubmitted"
    },
    render: function() {
        this.organisations.fetch({
            dataType: 'json'
        })
        this.$el.html('');
        return this;
    },
    organisationsSync: function() {
        this.$el.html(this.template({collection: this.organisations}));
    },
    formSubmitted: function(e){
        e.preventDefault();
        const name = String($('#name').val());
        const description = String($('#description').val());
        const private = $('#private').val();
        const org =  $('#orgSelection').val();
        const url = org ? `/api/v1/org/${org}/repos` : '/api/v1/user/repos'
        const body =
        `_csrf=${this.csrf}&name=${name}&description=${description}&private=${private}&auto_init=on`
        const request = new Request(url, {
            method: 'POST', 
            mode: 'cors',
            body: body,
            redirect: 'manual',
            credentials: 'same-origin',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
            })
        });
        fetch(request)
            .then(response => {
                if(response.ok) {
                    this.app.projects.fetch({
                        dataType: 'json'
                    }).then(() => this.app.router.navigate(`/projects/${name}`, true));
                }
                response.json().then(data => $('#responseText').text(data.message))
            });
    }
});

module.exports = CreateRepoView;
