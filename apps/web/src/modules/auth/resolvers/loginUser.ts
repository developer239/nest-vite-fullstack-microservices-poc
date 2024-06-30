/* eslint-disable no-console */
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../core/clients/firebaseClient.ts'
import { storeAccessToken } from '../services/localStorage'

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)

    const accessToken = await response.user.getIdToken()
    storeAccessToken(accessToken)

    return {
      code: 'success',
      message: 'Login successful',
      __typename: 'AuthResponse',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
