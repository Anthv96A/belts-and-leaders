Quickest way to get all services up and running from root directory

1. npm run docker-up

Client runs in localhost:3000
Server runs in localhost:5000

To view server Swagger documentation
http://localhost:5000/index.html


When you're finished with the containers

1. control + c stops the containers
2. npm run docker-down (this will destroy the containers)


FYI, 
    stopping the containers will hold onto any data which you may have been using ( e.g. mysql )
    destroying the containers will remove all data