FROM node:16.3.0-alpine3.11

WORKDIR /frontend

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start