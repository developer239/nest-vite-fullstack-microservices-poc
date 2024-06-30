/* eslint-disable no-console */
import { ApolloClient, from, InMemoryCache } from '@apollo/client'
import { signIn } from 'src/modules/auth/resolvers/signIn'
import { signUp } from 'src/modules/auth/resolvers/signUp'
import {
  authLink,
  errorLink,
  httpLink,
  refreshTokenLink,
} from 'src/modules/core/services/links'

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
