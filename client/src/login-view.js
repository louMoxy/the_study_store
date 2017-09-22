const Backbone = require('backbone');
const $ = require('jquery');

const LoginView = Backbone.View.extend({
    template: require('./login.ejs'),
    initialize: function(options) {
        this.csrf = options.csrf;
        this.app = options.app;
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
        const user_name = $('#user_name').val();
        const password = $('#password').val();
        const request = new Request('/userLogin', {
            method: 'POST', 
            mode: 'cors',
            body: `_csrf=${this.csrf}&user_name=${user_name}&password=${password}`,
            credentials: 'same-origin',
            headers: new Headers({
                "Content-type": 'application/x-www-form-urlencoded'
            })
        });
        fetch(request)
            .then(response => {
                return response.text();
            })
            .then(text => {
                if(text.includes('ui negative message')){
                    const reply =text.substring(text.lastIndexOf('<div class="ui negative message">'),
                        text.lastIndexOf('<h4 class="ui top attached header center">'));
                    $('#responseText').html(reply)
                } else {
                    this.app.createAuth();
                    this.app.router.navigate('/dashboard', true);
                }
            })
    },
});

module.exports = LoginView;
