FROM --platform=linux/amd64 node:18-alpine3.16

WORKDIR /app

COPY package.json yarn.lock turbo.json ./

COPY apps/service-auth/package.json ./apps/service-auth/
COPY packages/amqp-contracts/package.json ./packages/amqp-contracts/
COPY packages/nest-helpers/package.json ./packages/nest-helpers/

RUN yarn install

COPY apps/service-auth ./apps/service-auth
COPY packages/amqp-contracts ./packages/amqp-contracts
COPY packages/nest-helpers ./packages/nest-helpers

RUN yarn turbo run build

ENV PORT=8080

EXPOSE 8080

CMD ["node", "apps/service-auth/dist/main"]
