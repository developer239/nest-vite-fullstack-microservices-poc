# 1 Build stage
FROM --platform=linux/amd64 node:18.20.3 AS builder

WORKDIR /app

COPY package.json yarn.lock turbo.json ./

COPY apps/service-events/package.json ./apps/service-events/
COPY apps/service-events/tsconfig.json ./apps/service-events/
COPY apps/service-events/tsconfig.build.json ./apps/service-events/

COPY apps/service-gateway/package.json ./apps/service-gateway/
COPY apps/service-gateway/tsconfig.json ./apps/service-gateway/
COPY apps/service-gateway/tsconfig.build.json ./apps/service-gateway/

COPY packages/nest-helpers/package.json ./packages/nest-helpers/
COPY packages/nest-helpers/tsconfig.json ./packages/nest-helpers/

COPY packages/amqp-contracts/package.json ./packages/amqp-contracts/
COPY packages/amqp-contracts/tsconfig.json ./packages/amqp-contracts/

COPY _patch ./_patch

RUN yarn install

COPY apps/service-events ./apps/service-events
COPY apps/service-gateway ./apps/service-gateway
COPY packages/nest-helpers ./packages/nest-helpers
COPY packages/amqp-contracts ./packages/amqp-contracts

RUN yarn build

RUN yarn install --production

# 2 Production stage
FROM --platform=linux/amd64 node:18.20.3-alpine3.19

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/turbo.json ./
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/service-events/dist ./apps/service-events/dist
COPY --from=builder /app/apps/service-events/package.json ./apps/service-events/package.json

COPY --from=builder /app/packages/nest-helpers/dist ./packages/nest-helpers/dist
COPY --from=builder /app/packages/nest-helpers/package.json ./packages/nest-helpers/package.json

COPY --from=builder /app/packages/amqp-contracts/dist ./packages/amqp-contracts/dist
COPY --from=builder /app/packages/amqp-contracts/package.json ./packages/amqp-contracts/package.json

ENV PORT=8080
EXPOSE 8080

CMD ["node", "apps/service-events/dist/main"]
