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
- [x] Be able to add files to repo
- [x] Test adding admin users and admin to organisation using gitea admin panel
- [x] Be able to update files from upload

- Prototype 2
- [x] Handle the log-in rather than redirect
- [x] Initalize the repo with a readme
- [x] View history of file
- [x] Owner of repo can add user to organisation
- [x] Organisation page
- [x] User page (to list the organisation which user can access)
- [x] Handle user sign up
- [x] Create repo and upload files on same page - creating repo does a redirect to the repo to upload the files
- [x] 'Add new file' needs to have the branch as an option
- [ ] Add repo to org
- [ ] Renaming the repos to highway-models in the code
- [ ] Seperate files if the view also contains the model....
- [ ] Code renaming to make it easier to understand and adding comments
- [ ] If no organisations of models then show button to create one
- [ ] Seperate out the upload files into 3 (network (dat), results(dp), demand(dat,csv)) - Unsure how to do this best, unable to edit the file name being uploaded (works differently on different browsers), i could add it to the file data such as a commit, but then when displaying the model i would have to fetch all the files to get this data...
- [ ] When viewing the repo (model) need to filter by the three different type

Things to think about:

- Uploading files will there also be folders? if so will need to add tree_path into the file upload logic