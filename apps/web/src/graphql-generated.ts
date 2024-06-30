import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any }
}

export type AuthResponse = {
  __typename?: 'AuthResponse'
  code: Scalars['String']['output']
  message: Scalars['String']['output']
}

export type CreateEventInput = {
  capacity: Scalars['Float']['input']
  description: Scalars['String']['input']
  startsAt: Scalars['DateTime']['input']
  title: Scalars['String']['input']
}

export type Event = {
  __typename?: 'Event'
  attendees: Array<User>
  capacity: Scalars['Float']['output']
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  owner: User
  startsAt: Scalars['DateTime']['output']
  title: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  attendEvent: Event
  createEvent: Event
  deleteEvent: Scalars['Boolean']['output']
  loginUser: AuthResponse
  signUpUser: AuthResponse
  unattendEvent: Event
  updateEvent: Event
}

export type MutationAttendEventArgs = {
  id: Scalars['ID']['input']
}

export type MutationCreateEventArgs = {
  input: CreateEventInput
}

export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input']
}

export type MutationLoginUserArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationSignUpUserArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationUnattendEventArgs = {
  id: Scalars['ID']['input']
}

export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input']
  input: UpdateEventInput
}

export type Query = {
  __typename?: 'Query'
  event: Event
  events: Array<Event>
  user: User
}

export type QueryEventArgs = {
  id: Scalars['ID']['input']
}

export type QueryUserArgs = {
  id: Scalars['ID']['input']
}

export type UpdateEventInput = {
  capacity?: InputMaybe<Scalars['Float']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  startsAt?: InputMaybe<Scalars['DateTime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']['output']
  firstName: Scalars['String']['output']
  id: Scalars['ID']['output']
  lastName: Scalars['String']['output']
}

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type LoginUserMutation = {
  __typename?: 'Mutation'
  loginUser: { __typename?: 'AuthResponse'; code: string; message: string }
}

export type ListEventsQueryVariables = Exact<{ [key: string]: never }>

export type ListEventsQuery = {
  __typename?: 'Query'
  events: Array<{
    __typename?: 'Event'
    id: string
    title: string
    description: string
    startsAt: any
    capacity: number
    owner: {
      __typename?: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
    }
    attendees: Array<{
      __typename?: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
    }>
  }>
}

export const LoginUserDocument = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) @client {
      code
      message
    }
  }
`
export type LoginUserMutationFn = Apollo.MutationFunction<
  LoginUserMutation,
  LoginUserMutationVariables
>

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument,
    options
  )
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<
  LoginUserMutation,
  LoginUserMutationVariables
>
export const ListEventsDocument = gql`
  query ListEvents {
    events {
      id
      title
      description
      startsAt
      capacity
      owner {
        id
        firstName
        lastName
        email
      }
      attendees {
        id
        firstName
        lastName
        email
      }
    }
  }
`

/**
 * __useListEventsQuery__
 *
 * To run a query within a React component, call `useListEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListEventsQuery,
    ListEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ListEventsQuery, ListEventsQueryVariables>(
    ListEventsDocument,
    options
  )
}
export function useListEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListEventsQuery,
    ListEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ListEventsQuery, ListEventsQueryVariables>(
    ListEventsDocument,
    options
  )
}
export function useListEventsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    ListEventsQuery,
    ListEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<ListEventsQuery, ListEventsQueryVariables>(
    ListEventsDocument,
    options
  )
}
export type ListEventsQueryHookResult = ReturnType<typeof useListEventsQuery>
export type ListEventsLazyQueryHookResult = ReturnType<
  typeof useListEventsLazyQuery
>
export type ListEventsSuspenseQueryHookResult = ReturnType<
  typeof useListEventsSuspenseQuery
>
export type ListEventsQueryResult = Apollo.QueryResult<
  ListEventsQuery,
  ListEventsQueryVariables
>
