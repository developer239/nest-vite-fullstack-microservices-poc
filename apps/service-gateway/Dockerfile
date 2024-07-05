FROM --platform=linux/amd64 node:18.20.3-alpine3.19

RUN apk add --no-cache patch

WORKDIR /app

COPY package.json yarn.lock turbo.json ./

COPY apps /app/apps
COPY packages /app/packages
COPY _patch ./_patch

RUN yarn install

COPY apps /app/apps
COPY packages /app/packages

RUN yarn build

ENV PORT=8080
EXPOSE 8080

CMD ["node", "apps/service-gateway/dist/main"]
