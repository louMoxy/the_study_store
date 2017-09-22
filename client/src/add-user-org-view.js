const Backbone = require('backbone');
const $ = require('jquery');
Backbone.emulateJSON = true;

const AddUser = Backbone.View.extend({
    template: require('./add-user-org.ejs'),
    csrf: null,
    orgName: null,
    name: null,
    initialize: function(options) {
        this.csrf = options.csrf;
        this.app = options.app;
    },
    events: {
        'submit' : 'formSubmitted'
    },
    render: function() {
        this.$el.html(this.template({orgName: this.orgName, names: this.names}));
        return this;
    },
    formSubmitted: function(event){
        event.preventDefault();
        this.name = $('#userInput').val();
        const getCSRF = new Request('http://localhost:8080/api/v1/tree/swagger', {
            method: 'GET', 
            credentials: 'same-origin',
            headers: new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
            })
        });
        fetch(getCSRF)
            .then(response => {
                return response.text();
            }).then (text => {
                return csrf =text.substring(text.lastIndexOf('value="')+7,text.lastIndexOf('"'));
            }).then( (csrf)=> {
                const requestPUT = new Request(`/api/v1/tree/org/${this.orgName}/invitations/new`, {
                    method: 'POST', 
                    mode: 'cors',
                    body: `_csrf=${csrf}&uname=${this.name}`,
                    credentials: 'same-origin',
                    headers: new Headers({
                        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                    })
                });
                fetch(requestPUT)
                    .then(response => {
                        if(response.status === 404) {
                            let message = 'Organisation not found..';
                            $('#response').text(message);
                        } else {
                            this.app.router.navigate(`/org/${this.orgName}`, true);
                        }
                    })
                })
                ;
    }
});

module.exports = AddUser;
