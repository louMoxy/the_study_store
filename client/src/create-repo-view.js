const Backbone = require('backbone');
const $ = require('jquery');
const CreateRepo = require('./create-repo');

const CreateRepoView = Backbone.View.extend({
    template: require('./create-repo.ejs'),
    events: {
        'submit' : "formSubmitted"
    },
    initialize: function() {
        this.repo = new CreateRepo();
    },
    render: function() {
        this.$el.html(this.template);
        return this;
    },
    formSubmitted: function(e){
        e.preventDefault();
        const name = String($('#name').val());
        const description = String($('#description').val());
        const private = Boolean($('#private').val());
        this.repo.create({
                "name": name,
                "description": description,
                "private": private
        });
    }
});

module.exports = CreateRepoView;
