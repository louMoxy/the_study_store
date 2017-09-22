# the_study_store
To start gitea:
Download gitea 1.2 from [https://dl.gitea.io/gitea/](https://dl.gitea.io/gitea/)
Set variable:
set GITEA_CUSTOM=../the_study_store/gitea/custom
Then run the exe file in terminal with: gitea-1.2-windows-4.0-amd64.exe web
When setting up you will need to link to the example db:
database type: SQLite3
path: ../the_study_store/gitea/data/gitea.db

You will need to log in here:
http://localhost:3000 
Username: moxy
Password: testing

To start backbone:
cd client
npm install
npm start
