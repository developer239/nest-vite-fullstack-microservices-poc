/* eslint-disable no-console */
import { signInWithEmailAndPassword } from 'firebase/auth'
import { storeAccessToken } from 'src/modules/auth/services/localStorage'
import { auth } from 'src/modules/core/clients/firebaseClient'

export const signIn = async (email: string, password: string) => {
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
