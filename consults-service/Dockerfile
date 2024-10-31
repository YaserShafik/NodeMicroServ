FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm insatall --global nodemon

COPY . . 

EXPOSE 4003

CMD [ "npx", "nodemon", "app.js" ]