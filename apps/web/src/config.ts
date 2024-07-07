export const config = {
  uri: window.ENV.VITE_GRAPHQL_URI || import.meta.env.VITE_GRAPHQL_URI,
  firebase: {
    apiKey:
      window.ENV.VITE_GRAPHQL_API_KEY || import.meta.env.VITE_GRAPHQL_API_KEY,
    authDomain:
      window.ENV.VITE_GRAPHQL_AUTH_DOMAIN ||
      import.meta.env.VITE_GRAPHQL_AUTH_DOMAIN,
    projectId:
      window.ENV.VITE_GRAPHQL_PROJECT_ID ||
      import.meta.env.VITE_GRAPHQL_PROJECT_ID,
    storageBucket:
      window.ENV.VITE_GRAPHQL_STORAGE_BUCKET ||
      import.meta.env.VITE_GRAPHQL_STORAGE_BUCKET,
    messagingSenderId:
      window.ENV.VITE_GRAPHQL_MESSAGING_SENDER_ID ||
      import.meta.env.VITE_GRAPHQL_MESSAGING_SENDER_ID,
    appId:
      window.ENV.VITE_GRAPHQL_APP_ID || import.meta.env.VITE_GRAPHQL_APP_ID,
  },
}
