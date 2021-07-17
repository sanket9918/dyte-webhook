FROM node:12

RUN mkdir /express-app
WORKDIR /express-app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3001
CMD ["npm","start"]