FROM node:16.3.0-alpine3.11

WORKDIR /backend

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]