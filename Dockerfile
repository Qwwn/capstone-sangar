FROM node:18-slim as dependencies

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

FROM dependencies

RUN npm run build
EXPOSE 3000
CMD npm run start