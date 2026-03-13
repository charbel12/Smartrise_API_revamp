FROM node:20-alpine

WORKDIR /app

RUN npm install -g nodemon

EXPOSE 9300
