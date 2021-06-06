FROM node:15-alpine

WORKDIR /backend

COPY ./package*.json /backend

RUN npm i

EXPOSE 5000

COPY . /backend

CMD ["npm", "run", "server"]