/* eslint-disable no-console */
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { signIn } from 'src/modules/auth/resolvers/signIn'
import { signUp } from 'src/modules/auth/resolvers/signUp'
import { getAccessToken } from 'src/modules/auth/services/localStorage'
import { auth } from 'src/modules/core/clients/firebaseClient'

// TODO: move to separate file
export const refreshAccessToken = () => {
  const user = auth.currentUser

  if (user) {
    return user
      .getIdToken(true)
      .then((accessToken) => {
        localStorage.setItem('accessToken', accessToken)
        return accessToken
      })
      .catch((error) => {
        console.error('Failed to refresh token', error)
        throw new Error('Failed to refresh access token')
      })
  }

  throw new Error('No user logged in')
}

// TODO: move links to separate files
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
})

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const refreshTokenLink = onError(({ graphQLErrors, forward, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        try {
          const token = refreshAccessToken()
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${token}`,
            },
          }))

          return forward(operation)
        } catch (refreshError) {
          console.error('Could not refresh the token', refreshError)
        }
      }
    }
  }
})

export const client = new ApolloClient({
  link: from([refreshTokenLink, authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      signIn: (_, { email, password }) => signIn(email, password),
      signUp: (_, { email, password, firstName, lastName }) =>
        signUp(email, password, firstName, lastName),
    },
  },
})
