const d3 = require('d3-fetch');
// const d3 = require('d3-request');
const $ = require('jquery');

const token = '7844620bbfd0adf39fdc5f6077d1cdf6cfade51f';

d3.json("/api/v1/repos/search").then(function(data) {
    console.log(data.data)
    data.data.forEach(function(repos) {
        const owner = repos.owner.username;
        const ownerImg = repos.owner.avatar_url;
        const areYouAdmin = repos.permissions.admin;
        const repoUrl = repos.html_url;
        const repoName = repos.name;
        const created = repos.created_at;
        $('.content').append(`<div class="repo"><img src=${repos.owner.avatar_url}>`).append(`<h1>${owner}</h1>`);
        if(areYouAdmin) {
            $('.user').append('Admin') 
        }
        $('.content').append(`<h3>Repo: <a href=${repoUrl}>${repoName}</a></h3><p>${created}</p></div>`);
    }, this);
  });

  d3.json(`/api/v1/orgs/advocados/members?token=${token}`).then(function(data) {
    const members = data;
    console.log(members);
  });
