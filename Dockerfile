FROM node:21-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

ENTRYPOINT [ "node", "src/server.js" ]