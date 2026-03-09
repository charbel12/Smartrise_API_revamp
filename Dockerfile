FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g nodemon
COPY . .

EXPOSE 9300

CMD ["nodemon", "--legacy-watch", "app.js"]