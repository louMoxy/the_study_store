const Backbone = require('backbone');
const $ = require('jquery');

const CreateRepoView = Backbone.View.extend({
    template: require('./create-repo.ejs'),
    initialize: function(options) {
        this.csrf = options.csrf;
    },
    events: {
        'submit' : "formSubmitted"
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    formSubmitted: function(e){
        e.preventDefault();
        const name = String($('#name').val());
        const description = String($('#description').val());
        const private = $('#private').val();
        const request = new Request('/api/v1/user/repos', {
            method: 'POST', 
            mode: 'cors',
            body: `_csrf=${this.csrf}&name=${name}&description=${description}&private=${private}`,
            redirect: 'manual',
            credentials: 'same-origin',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
            })
        });
        fetch(request)
            .then(response => {
                if(response.ok) {
                    $('#responseText').text(response.statusText);
                } 
                response.json().then(data => $('#responseText').text(data.message))
            });
    }
});

module.exports = CreateRepoView;
