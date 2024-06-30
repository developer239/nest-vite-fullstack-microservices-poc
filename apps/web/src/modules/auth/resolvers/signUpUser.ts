import { createUserWithEmailAndPassword } from 'firebase/auth'
import { storeAccessToken } from 'src/modules/auth/services/localStorage'
import { auth } from 'src/modules/core/clients/firebaseClient'

export const signUpUser = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)

    const accessToken = await response.user.getIdToken()
    storeAccessToken(accessToken)

    // TODO: update user profile information in service-auth (first name, last name, etc.)

    return {
      code: 'success',
      message: 'Account creation successful',
      __typename: 'AuthResponse',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
