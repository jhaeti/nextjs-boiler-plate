FROM node:15-alpine

RUN mkdir /frontend

WORKDIR /frontend

COPY ./package*.json /frontend

RUN npm install

COPY . /frontend

EXPOSE 3000

CMD ["npm", "run", "dev"]