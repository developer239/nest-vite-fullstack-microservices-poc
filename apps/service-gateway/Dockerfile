# 1 Build stage
FROM --platform=linux/amd64 node:18.20.3 AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y patch

COPY package.json yarn.lock turbo.json ./

COPY apps/service-gateway/package.json ./apps/service-gateway/
COPY apps/service-gateway/tsconfig.json ./apps/service-gateway/
COPY apps/service-gateway/tsconfig.build.json ./apps/service-gateway/

COPY packages/nest-helpers/package.json ./packages/nest-helpers/
COPY packages/nest-helpers/tsconfig.json ./packages/nest-helpers/

COPY _patch ./_patch

RUN yarn install
RUN yarn patch-apollo

COPY apps/service-gateway ./apps/service-gateway
COPY packages/nest-helpers ./packages/nest-helpers

RUN yarn build

RUN yarn install --production
RUN yarn patch-apollo

# 2 Production stage
FROM --platform=linux/amd64 node:18.20.3-alpine3.19

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/turbo.json ./
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/service-gateway/dist ./apps/service-gateway/dist
COPY --from=builder /app/apps/service-gateway/package.json ./apps/service-gateway/package.json

COPY --from=builder /app/packages/nest-helpers/dist ./packages/nest-helpers/dist
COPY --from=builder /app/packages/nest-helpers/package.json ./packages/nest-helpers/package.json

ENV PORT=8080
EXPOSE 8080

CMD ["node", "apps/service-gateway/dist/main"]
