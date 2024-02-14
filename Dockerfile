FROM node:20-slim

COPY . /casanje-rinha
WORKDIR /casanje-rinha

RUN yarn install
RUN yarn build
CMD yarn start