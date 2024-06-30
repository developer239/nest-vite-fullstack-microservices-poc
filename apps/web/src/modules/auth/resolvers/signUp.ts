import { createUserWithEmailAndPassword } from 'firebase/auth'
import { UpdateProfileDocument } from 'src/graphql-generated'
import { storeAccessToken } from 'src/modules/auth/services/localStorage'
import { client } from 'src/modules/core/clients/apolloClient'
import { auth } from 'src/modules/core/clients/firebaseClient'

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)

    const accessToken = await response.user.getIdToken()
    storeAccessToken(accessToken)

    await client.mutate({
      mutation: UpdateProfileDocument,
      variables: {
        input: {
          firstName,
          lastName,
        },
      },
    })

    return {
      code: 'success',
      message: 'Account creation successful',
      __typename: 'AuthResponse',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
