/// <reference types="vite/client" />

// eslint-disable-next-line
interface Window {
  ENV: {
    VITE_GRAPHQL_URI: string
    VITE_GRAPHQL_API_KEY: string
    VITE_GRAPHQL_AUTH_DOMAIN: string
    VITE_GRAPHQL_PROJECT_ID: string
    VITE_GRAPHQL_STORAGE_BUCKET: string
    VITE_GRAPHQL_MESSAGING_SENDER_ID: string
    VITE_GRAPHQL_APP_ID: string
  }
}
