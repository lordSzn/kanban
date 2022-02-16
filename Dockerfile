FROM node:16.10.0-alpine3.11
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD [ "yarn", "dev" ]