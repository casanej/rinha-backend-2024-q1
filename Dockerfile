FROM node:20-slim

COPY . /casanje-rinha
WORKDIR /casanje-rinha

RUN yarn install --production
RUN yarn global add @nestjs/cli
RUN yarn build

EXPOSE 3000

CMD yarn start