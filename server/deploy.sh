
# git add .
# git commit -m 'deploy flask to heroku'
# heroku git:remote -a comp3888-flask
# git push heroku `git subtree split --prefix flask feature/CT0G-181-find-hosting-platform-for-pytho`:master --force
heroku git:remote -a comp3888-server 
git remote -v 
# git subtree push --prefix server heroku master
git push heroku `git subtree split --prefix server dev`:master --force
