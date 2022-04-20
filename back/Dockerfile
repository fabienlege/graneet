FROM node:16-alpine

COPY . /app

WORKDIR /app

RUN yarn install

CMD ["node", "dist/src/main.js"]