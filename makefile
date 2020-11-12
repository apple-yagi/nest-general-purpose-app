up:
	docker-compose up -d
down:
	docker-compose down
build:
	docker-compose build
start:
	docker-compose up --build -d
ps:
	docker ps -a
mongo:
	docker-compose up -d mongo
mys:
	docker-compose up -d mysql
redis:
	docker-compose up -d redis
push:
	git push origin master
pull:
	git pull origin master
all-up:
	make mongo && make mys && yarn dev