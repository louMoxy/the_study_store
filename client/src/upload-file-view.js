const Backbone = require('backbone');
const $ = require('jquery');
const Dropzone = require('dropzone');

const UploadFileview = Backbone.View.extend({
    className: 'upload-form',
    projectName: null,
    template: require('./upload-file.ejs'),
    initialize: function(options){
        this.user = options.user;
        this.settings = {
            files:'master',
            commit_choice: 'direct',
            commit_summary: 'Summary',
            commit_message: 'Commit message',
            csrf: null,
            uuid: null
        }
    },
    events: {
        'submit' : 'formSubmitted'
    },
    render: function() {
        this.$el.html(this.template(this.settings));
        return this;
    },
    formSubmitted: function(e){
        e.preventDefault();
        const commitmessage=  $('#commit_summary').val();
        const summary=  $('#commit_message').val();
        const form = document.forms.namedItem('fileinfo');
        const formData = new FormData(form);
        const branch = 'master';
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
                return csrf =text.substring(text.lastIndexOf('value="')+7,text.lastIndexOf('=="'));
            }).then( (csrf)=> {
                this.settings.csrf = `${csrf}==`;
                const requestUUID = new Request(`/api/v1/tree/${this.user}/${this.projectName}/upload-file`, {
                        method: 'POST', 
                        mode: 'cors',
                        body: formData,
                        credentials: 'same-origin',
                        headers: {
                            "x-csrf-token": this.settings.csrf
                        }
                    });
                fetch(requestUUID)
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {
                        this.settings.uuid = response.uuid;
                        this.$el.html(this.template(this.settings));
                        const requestPOST = new Request(`/api/v1/tree/${this.user}/${this.projectName}/_upload/${branch}`, {
                            method: 'POST', 
                            mode: 'cors',
                            body: `_csrf=${this.settings.csrf}&files=${this.settings.uuid}&commit_choice=direct&commit_message=${commitmessage}&commit_summary=${summary}`,
                            credentials: 'same-origin',
                            headers: new Headers({
                                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
                            })
                        });
                        fetch(requestPOST);
                    })
            });
    }
});

module.exports = UploadFileview;
