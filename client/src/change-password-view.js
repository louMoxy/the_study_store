const Backbone = require('backbone');
const $ = require('jquery');
Backbone.emulateJSON = true;

const CreatePassView = Backbone.View.extend({
    template: require('./change-password.ejs'),
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
        const csrf= '52HzwiHa1UdFj8aIBv3XK1g1GZ86MTUwNTIzMTU0NzA2NzM3NTAwMA%3D%3D';
        const request = new Request('/userSettings/password', {
            method: 'POST', 
            mode: 'cors',
            body: `_csrf=${csrf}&old_password=${old_password}&password=${password}&retype=${retype}`,
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
