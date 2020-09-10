FROM node:14-alpine

WORKDIR "/app"

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY ./config ./config
COPY ./public ./public
COPY ./scripts ./scripts
COPY ./src ./src

COPY .env .
COPY .eslintrc .
COPY jest.conf.json .

EXPOSE 3000

CMD [ "npm", "start" ]

