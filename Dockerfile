FROM node:12-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3030

CMD [ "node", "build/index.js" ]
