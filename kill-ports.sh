# Helper shell file to kill ports in case they don't get closed properly
lsof -ti tcp:9000 | xargs kill -9
lsof -ti tcp:3000 | xargs kill -9
lsof -ti tcp:4000 | xargs kill -9
lsof -ti tcp:5000 | xargs kill -9
