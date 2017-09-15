# the_study_store

To start gitea:
Download gitea 1.2 from [https://dl.gitea.io/gitea/](https://dl.gitea.io/gitea/)
Then run the exe file in terminal with: gitea-1.2-windows-4.0-amd64.exe web
When setting up you will need to link to the example db:
../the_study_store/gitea/data/gitea.db

You will need to log in here: 
http://localhost:3000 
Username: moxy
Password: testing

To start backbone:
cd client
npm install
npm start

gitea template files which have been modifies are:
repo/bare --- when there is no files in the repo)
repo/home --- repo list
user/settings/password --- password change response