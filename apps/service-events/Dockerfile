# Stage 1: Build Stage
FROM --platform=linux/amd64 node:18-alpine3.16 AS builder

WORKDIR /app

COPY package.json yarn.lock turbo.json ./

COPY apps/service-events/package.json ./apps/service-events/
COPY packages/amqp-contracts/package.json ./packages/amqp-contracts/
COPY packages/nest-helpers/package.json ./packages/nest-helpers/

RUN yarn install

COPY apps/service-events ./apps/service-events
COPY packages/amqp-contracts ./packages/amqp-contracts
COPY packages/nest-helpers ./packages/nest-helpers

RUN yarn turbo run build --filter=service-events...

# Stage 2: Production Stage
FROM --platform=linux/amd64 node:18-alpine3.16 AS production

WORKDIR /app

COPY --from=builder /app/apps/service-events/dist ./apps/service-events/dist
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=8080 \
    NODE_ENV=production

EXPOSE 8080

CMD ["node", "apps/service-events/dist/main"]
