# 1 Build stage
FROM --platform=linux/amd64 node:18.20.3 AS builder

WORKDIR /app

COPY package.json yarn.lock turbo.json ./
COPY apps/storybook/package.json ./apps/storybook/
COPY apps/web/package.json ./apps/web/
COPY packages/ui-library/package.json ./packages/ui-library/

RUN yarn install

COPY apps/storybook ./apps/storybook
COPY apps/web ./apps/web
COPY packages/ui-library ./packages/ui-library

RUN yarn build

# 2 Production stage
FROM --platform=linux/amd64 node:18.20.3-alpine3.19

WORKDIR /app

COPY --from=builder /app/apps/storybook/storybook-static ./storybook-static

RUN npm install -g http-server

ENV PORT=8080
EXPOSE 8080

CMD ["http-server", "./storybook-static", "--port", "8080"]
