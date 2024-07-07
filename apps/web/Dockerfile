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

# Copy startup script
COPY apps/web/startup.sh /startup.sh
RUN chmod +x /startup.sh

RUN echo 'server { \
    listen 8080; \
    \
    gzip on; \
    gzip_vary on; \
    gzip_proxied any; \
    gzip_comp_level 6; \
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["/startup.sh"]
