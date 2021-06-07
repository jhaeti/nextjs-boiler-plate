FROM node:15-alpine

RUN mkdir /backend

WORKDIR /backend

COPY ./package*.json /backend

RUN npm install

COPY . /backend

EXPOSE 5000

CMD ["npm", "run", "server"]