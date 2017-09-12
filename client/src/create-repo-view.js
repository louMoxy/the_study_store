const Backbone = require('backbone');
const $ = require('jquery');

const CreateRepoView = Backbone.View.extend({
    template: require('./create-repo.ejs'),
    events: {
        'submit' : "formSubmitted"
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    formSubmitted: function(e){
        e.preventDefault();
        const csrf= '52HzwiHa1UdFj8aIBv3XK1g1GZ86MTUwNTIzMTU0NzA2NzM3NTAwMA%3D%3D';
        const name = String($('#name').val());
        const description = String($('#description').val());
        const private = $('#private').val();
        const request = new Request('/api/v1/user/repos', {
            method: 'POST', 
            mode: 'cors',
            body: `_csrf=${csrf}&name=${name}&description=${description}&private=${private}`,
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
