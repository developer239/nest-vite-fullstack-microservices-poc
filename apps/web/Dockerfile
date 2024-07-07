# 1. Build stage
FROM --platform=linux/amd64 node:18.20.3 AS builder

WORKDIR /app

COPY package.json yarn.lock turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ui-library/package.json ./packages/ui-library/

RUN yarn install

COPY apps/web ./apps/web
COPY packages/ui-library ./packages/ui-library

RUN find ./apps/web -name "*.stories.tsx" -type f -delete

RUN yarn workspace web build

# 2. Production stage
FROM --platform=linux/amd64 nginx:alpine

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

RUN echo 'server { \
    listen 8080; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
