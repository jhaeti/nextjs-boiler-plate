FROM node:15-alpine3.11

RUN mkdir /backend

WORKDIR /backend

COPY ./package*.json /backend

ENV NODE_ENV=production

RUN npm install

COPY . /backend

EXPOSE 5000

CMD ["npm", "start"]