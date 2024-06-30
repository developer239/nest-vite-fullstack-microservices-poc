/* eslint-disable no-console */
import { HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getAccessToken } from 'src/modules/auth/services/localStorage'
import { refreshAccessToken } from 'src/modules/core/clients/firebaseClient'

export const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
})

export const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const refreshTokenLink = onError(
  ({ graphQLErrors, forward, operation }) => {
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
  }
)
