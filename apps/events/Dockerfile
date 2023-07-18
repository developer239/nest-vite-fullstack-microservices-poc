FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY --from=development /usr/src/app/dist ./dist

# Start the application
CMD ["node", "dist/apps/events/apps/events/main"]
