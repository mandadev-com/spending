FROM node:18.16.0-alpine3.17

RUN mkdir -p /opt/app

WORKDIR /opt/app/backend

COPY backend/package*.json ./

RUN npm install

COPY . /opt/app

EXPOSE 4111

CMD [ "node", "server.js"]