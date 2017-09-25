const Backbone = require('backbone');
const $ = require('jquery');

const SignUpView = Backbone.View.extend({
    template: require('./sign-up.ejs'),
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
        const retype = $('#retype').val();
        const email = $('#email').val();
        const request = new Request('/api/v1/tree/user/sign_up', {
            method: 'POST', 
            mode: 'cors',
            redirect: 'manual', 
            body: `_csrf=${this.csrf}&user_name=${user_name}&email=${email}&password=${password}&retype=${retype}`,
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
                        text.indexOf('<div class="required inline field ">'));
                    $('#responseText').html(reply)
                } else {
                    this.app.router.navigate('/login', true);
                }
            })
    },
});

module.exports = SignUpView;
