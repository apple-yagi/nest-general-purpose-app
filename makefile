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
	docker exec -it mongo bash
push:
	git push origin master