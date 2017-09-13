const Backbone = require('backbone');
const $ = require('jquery');
Backbone.emulateJSON = true;

const CreatePassView = Backbone.View.extend({
    template: require('./change-password.ejs'),
    csrf: null,
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
        const old_password = $('#old_password').val();
        const password = $('#password').val();
        const retype = $('#retype').val();
        const request = new Request('/userSettings/password', {
            method: 'POST', 
            mode: 'cors',
            body: `_csrf=${this.csrf}&old_password=${old_password}&password=${password}&retype=${retype}`,
            redirect: 'manual',
            credentials: 'same-origin',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
            })
        });

        const getRequest = new Request('/userSettings/password', {
            method: 'GET', 
            mode: 'cors',
            credentials: 'same-origin',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
            })
        });

        fetch(request)
            .then(response => {
                fetch(getRequest)
                    .then(resp => resp.text())
                    .then(data => $('#response').html(data))
            })
    }
});

module.exports = CreatePassView;
