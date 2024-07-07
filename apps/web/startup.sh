#!/bin/sh

# Inject runtime config
echo "window.ENV = {" > /usr/share/nginx/html/config.js
echo "  VITE_GRAPHQL_URI: '${VITE_GRAPHQL_URI}'," >> /usr/share/nginx/html/config.js
echo "  VITE_GRAPHQL_API_KEY: '${VITE_GRAPHQL_API_KEY}'," >> /usr/share/nginx/html/config.js
echo "  VITE_GRAPHQL_AUTH_DOMAIN: '${VITE_GRAPHQL_AUTH_DOMAIN}'," >> /usr/share/nginx/html/config.js
echo "  VITE_GRAPHQL_PROJECT_ID: '${VITE_GRAPHQL_PROJECT_ID}'," >> /usr/share/nginx/html/config.js
echo "  VITE_GRAPHQL_STORAGE_BUCKET: '${VITE_GRAPHQL_STORAGE_BUCKET}'," >> /usr/share/nginx/html/config.js
echo "  VITE_GRAPHQL_MESSAGING_SENDER_ID: '${VITE_GRAPHQL_MESSAGING_SENDER_ID}'," >> /usr/share/nginx/html/config.js
echo "  VITE_GRAPHQL_APP_ID: '${VITE_GRAPHQL_APP_ID}'" >> /usr/share/nginx/html/config.js
echo "};" >> /usr/share/nginx/html/config.js

# Start Nginx
nginx -g 'daemon off;'
