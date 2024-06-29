import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GRAPHQL_API_KEY,
  authDomain: import.meta.env.VITE_GRAPHQL_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_GRAPHQL_PROJECT_ID,
  storageBucket: import.meta.env.VITE_GRAPHQL_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_GRAPHQL_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_GRAPHQL_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
