/* eslint-disable no-console */
import { ApolloClient, gql, InMemoryCache, makeVar } from '@apollo/client'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseConfig'

export const isLoggedInVar = makeVar(false)

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      loginUser: async (_, { email, password }) => {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          isLoggedInVar(true)

          return {
            code: 'success',
            message: 'Login successful',
            __typename: 'AuthResponse',
          }
        } catch (error) {
          console.error(error)
          return {
            code: 'error',
            message: error.message,
            __typename: 'AuthResponse',
          }
        }
      },
    },
  },
  typeDefs: gql`
    extend type Mutation {
      loginUser(email: String!, password: String!): AuthResponse!
    }

    type AuthResponse {
      code: String!
      message: String!
    }
  `,
})
