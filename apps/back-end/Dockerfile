FROM node:18

WORKDIR /app

COPY package*.json ./

COPY .env-local ./.env

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "start" ]