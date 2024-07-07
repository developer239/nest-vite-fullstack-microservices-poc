/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { config } from 'src/config'

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const refreshAccessToken = async () => {
  const user = auth.currentUser

  if (user) {
    try {
      const accessToken = await user.getIdToken(true)
      localStorage.setItem('accessToken', accessToken)

      return accessToken
    } catch (error) {
      console.log('Failed to refresh token', error)
      throw new Error('Failed to refresh access token')
    }
  }

  throw new Error('No user logged in')
}
