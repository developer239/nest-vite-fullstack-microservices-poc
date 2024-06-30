/* eslint-disable no-console */
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { loginUser } from 'src/modules/auth/resolvers/loginUser'
import { getAccessToken } from 'src/modules/auth/services/localStorage'

// TODO: implement refresh token

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  headers: {
    authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
  },
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

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      loginUser: (_, { email, password }) => loginUser(email, password),
    },
  },
})
