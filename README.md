# the_study_store

To start gitea:

- Download gitea 1.2 from [https://dl.gitea.io/gitea/](https://dl.gitea.io/gitea/)
- Set variable:
  set GITEA_WORK_DIR=../the_study_store/gitea/
- Then run the exe file in terminal with:
  gitea-1.2-windows-4.0-amd64.exe web
- When its running on local 3000 you will be able to input the databse info on the screen:
    database type: SQLite3
    path: ../the_study_store/gitea/data/gitea.db

You can either register as a new user, or use my login (admin privilege's)
Username: moxy
Password: testing

To start backbone:

- cd client
- npm install
- npm start
