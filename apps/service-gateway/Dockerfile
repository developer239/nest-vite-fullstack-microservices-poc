# Stage 1: Build Stage
FROM --platform=linux/amd64 node:18-alpine3.16 AS builder

WORKDIR /app

# Patch
RUN apk add --no-cache patch
COPY _patch ./_patch

COPY package.json yarn.lock turbo.json ./

COPY apps/service-gateway/package.json ./apps/service-gateway/
COPY packages/nest-helpers/package.json ./packages/nest-helpers/

RUN yarn install
RUN yarn patch-apollo

COPY apps/service-gateway ./apps/service-gateway
COPY packages/nest-helpers ./packages/nest-helpers

RUN yarn turbo run build --filter=service-gateway...

# Stage 2: Production Stage
FROM --platform=linux/amd64 node:18-alpine3.16 AS production

WORKDIR /app

COPY --from=builder /app/apps/service-gateway/dist ./apps/service-gateway/dist
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=8080 \
    NODE_ENV=production

EXPOSE 8080

CMD ["node", "apps/service-gateway/dist/main"]
