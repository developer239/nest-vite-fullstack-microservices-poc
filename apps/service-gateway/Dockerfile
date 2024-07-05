FROM --platform=linux/amd64 node:18-alpine3.16

WORKDIR /app

# Patch
RUN apk add --no-cache patch
COPY _patch ./_patch

COPY package.json yarn.lock turbo.json ./

COPY apps/service-gateway/package.json ./apps/service-gateway/
COPY packages/nest-helpers/package.json ./packages/nest-helpers/

RUN yarn install

COPY apps/service-gateway ./apps/service-gateway
COPY packages/nest-helpers ./packages/nest-helpers

RUN yarn turbo run build

ENV PORT=8080

EXPOSE 8080

CMD ["node", "apps/service-gateway/dist/main"]
