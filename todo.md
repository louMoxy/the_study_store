##TODO

User logged in:
- [x] log in
- [x] select repo from list
- [x] get contents from the file
- [x] upload file to the repo
- [x] Create new project
- [x] User can Change password - amend the proxy server
- [x] Select file with certain extension from repo list
- [x] Navigation
- [x] Remove gitea from repo and add instructions to install from binary and how to set up config file and and templates
- [x] Redoing the sample repos in the repo
- [x] Also upload the SQLlite
- [x] Amend a template to get the CSRF token
- [ ] Be able to add files to repo
- [ ] Handle the log-in rather than redirect
- [ ] Test adding admin users and admin to organisation using gitea admin panel

To upload a file the url is: :username/:reponame/_upload
Post: header stuff
In text format same as reset password request
_csrf:ylP03hTiXKxp7YgbGPm1pkkuhzI6MTUwNTQ5MDEzNjczNDMwMDEwMA==
tree_path:
files:4ca25feb-9457-4952-bfb7-1719fd06649d //obvs refers to the commit number...
commit_summary:
commit_message:
commit_choice:direct
new_branch_name:

- Prototype 2
- [ ] View history of file