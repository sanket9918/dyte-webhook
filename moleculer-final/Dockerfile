FROM node:12

RUN mkdir /main-app
WORKDIR /main-app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["npm","start"]