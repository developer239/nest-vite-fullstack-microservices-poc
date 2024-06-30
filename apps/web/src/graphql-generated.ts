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
  signIn: AuthResponse
  signUp: AuthResponse
  unattendEvent: Event
  updateEvent: Event
  updateProfile: User
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

export type MutationSignInArgs = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationSignUpArgs = {
  email: Scalars['String']['input']
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
  password: Scalars['String']['input']
}

export type MutationUnattendEventArgs = {
  id: Scalars['ID']['input']
}

export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input']
  input: UpdateEventInput
}

export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput
}

export type Query = {
  __typename?: 'Query'
  event: Event
  events: Array<Event>
  me: User
}

export type QueryEventArgs = {
  id: Scalars['ID']['input']
}

export type UpdateEventInput = {
  capacity?: InputMaybe<Scalars['Float']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  startsAt?: InputMaybe<Scalars['DateTime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type UpdateProfileInput = {
  firstName?: InputMaybe<Scalars['String']['input']>
  lastName?: InputMaybe<Scalars['String']['input']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']['output']
  firstName: Scalars['String']['output']
  id: Scalars['ID']['output']
  lastName: Scalars['String']['output']
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me: {
    __typename?: 'User'
    id: string
    email: string
    firstName: string
    lastName: string
  }
}

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
}>

export type SignInMutation = {
  __typename?: 'Mutation'
  signIn: { __typename?: 'AuthResponse'; code: string; message: string }
}

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input']
  password: Scalars['String']['input']
  firstName: Scalars['String']['input']
  lastName: Scalars['String']['input']
}>

export type SignUpMutation = {
  __typename?: 'Mutation'
  signUp: { __typename?: 'AuthResponse'; code: string; message: string }
}

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput
}>

export type UpdateProfileMutation = {
  __typename?: 'Mutation'
  updateProfile: { __typename?: 'User'; firstName: string; lastName: string }
}

export type AttendEventMutationVariables = Exact<{
  eventId: Scalars['ID']['input']
}>

export type AttendEventMutation = {
  __typename?: 'Mutation'
  attendEvent: { __typename?: 'Event'; id: string }
}

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput
}>

export type CreateEventMutation = {
  __typename?: 'Mutation'
  createEvent: {
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
    }
    attendees: Array<{
      __typename?: 'User'
      id: string
      firstName: string
      lastName: string
    }>
  }
}

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteEventMutation = {
  __typename?: 'Mutation'
  deleteEvent: boolean
}

export type EventDetailQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type EventDetailQuery = {
  __typename?: 'Query'
  event: {
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
    }
    attendees: Array<{
      __typename?: 'User'
      id: string
      firstName: string
      lastName: string
    }>
  }
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
    }
    attendees: Array<{
      __typename?: 'User'
      id: string
      firstName: string
      lastName: string
    }>
  }>
}

export type UnattendEventMutationVariables = Exact<{
  eventId: Scalars['ID']['input']
}>

export type UnattendEventMutation = {
  __typename?: 'Mutation'
  unattendEvent: { __typename?: 'Event'; id: string }
}

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID']['input']
  input: UpdateEventInput
}>

export type UpdateEventMutation = {
  __typename?: 'Mutation'
  updateEvent: {
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
    }
    attendees: Array<{
      __typename?: 'User'
      id: string
      firstName: string
      lastName: string
    }>
  }
}

export const MeDocument = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const SignInDocument = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) @client {
      code
      message
    }
  }
`
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  )
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>
export const SignUpDocument = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) @client {
      code
      message
    }
  }
`
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  )
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>
export const UpdateProfileDocument = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      firstName
      lastName
    }
  }
`
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument, options)
}
export type UpdateProfileMutationHookResult = ReturnType<
  typeof useUpdateProfileMutation
>
export type UpdateProfileMutationResult =
  Apollo.MutationResult<UpdateProfileMutation>
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>
export const AttendEventDocument = gql`
  mutation AttendEvent($eventId: ID!) {
    attendEvent(id: $eventId) {
      id
    }
  }
`
export type AttendEventMutationFn = Apollo.MutationFunction<
  AttendEventMutation,
  AttendEventMutationVariables
>

/**
 * __useAttendEventMutation__
 *
 * To run a mutation, you first call `useAttendEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendEventMutation, { data, loading, error }] = useAttendEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAttendEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AttendEventMutation,
    AttendEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AttendEventMutation, AttendEventMutationVariables>(
    AttendEventDocument,
    options
  )
}
export type AttendEventMutationHookResult = ReturnType<
  typeof useAttendEventMutation
>
export type AttendEventMutationResult =
  Apollo.MutationResult<AttendEventMutation>
export type AttendEventMutationOptions = Apollo.BaseMutationOptions<
  AttendEventMutation,
  AttendEventMutationVariables
>
export const CreateEventDocument = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      title
      description
      startsAt
      capacity
      owner {
        id
        firstName
        lastName
      }
      attendees {
        id
        firstName
        lastName
      }
    }
  }
`
export type CreateEventMutationFn = Apollo.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    options
  )
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>
export type CreateEventMutationResult =
  Apollo.MutationResult<CreateEventMutation>
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>
export const DeleteEventDocument = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`
export type DeleteEventMutationFn = Apollo.MutationFunction<
  DeleteEventMutation,
  DeleteEventMutationVariables
>

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEventMutation,
    DeleteEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(
    DeleteEventDocument,
    options
  )
}
export type DeleteEventMutationHookResult = ReturnType<
  typeof useDeleteEventMutation
>
export type DeleteEventMutationResult =
  Apollo.MutationResult<DeleteEventMutation>
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<
  DeleteEventMutation,
  DeleteEventMutationVariables
>
export const EventDetailDocument = gql`
  query EventDetail($id: ID!) {
    event(id: $id) {
      id
      title
      description
      startsAt
      capacity
      owner {
        id
        firstName
        lastName
      }
      attendees {
        id
        firstName
        lastName
      }
    }
  }
`

/**
 * __useEventDetailQuery__
 *
 * To run a query within a React component, call `useEventDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventDetailQuery(
  baseOptions: Apollo.QueryHookOptions<
    EventDetailQuery,
    EventDetailQueryVariables
  > &
    (
      | { variables: EventDetailQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EventDetailQuery, EventDetailQueryVariables>(
    EventDetailDocument,
    options
  )
}
export function useEventDetailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EventDetailQuery,
    EventDetailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EventDetailQuery, EventDetailQueryVariables>(
    EventDetailDocument,
    options
  )
}
export function useEventDetailSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    EventDetailQuery,
    EventDetailQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<EventDetailQuery, EventDetailQueryVariables>(
    EventDetailDocument,
    options
  )
}
export type EventDetailQueryHookResult = ReturnType<typeof useEventDetailQuery>
export type EventDetailLazyQueryHookResult = ReturnType<
  typeof useEventDetailLazyQuery
>
export type EventDetailSuspenseQueryHookResult = ReturnType<
  typeof useEventDetailSuspenseQuery
>
export type EventDetailQueryResult = Apollo.QueryResult<
  EventDetailQuery,
  EventDetailQueryVariables
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
      }
      attendees {
        id
        firstName
        lastName
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
export const UnattendEventDocument = gql`
  mutation UnattendEvent($eventId: ID!) {
    unattendEvent(id: $eventId) {
      id
    }
  }
`
export type UnattendEventMutationFn = Apollo.MutationFunction<
  UnattendEventMutation,
  UnattendEventMutationVariables
>

/**
 * __useUnattendEventMutation__
 *
 * To run a mutation, you first call `useUnattendEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnattendEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unattendEventMutation, { data, loading, error }] = useUnattendEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useUnattendEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnattendEventMutation,
    UnattendEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UnattendEventMutation,
    UnattendEventMutationVariables
  >(UnattendEventDocument, options)
}
export type UnattendEventMutationHookResult = ReturnType<
  typeof useUnattendEventMutation
>
export type UnattendEventMutationResult =
  Apollo.MutationResult<UnattendEventMutation>
export type UnattendEventMutationOptions = Apollo.BaseMutationOptions<
  UnattendEventMutation,
  UnattendEventMutationVariables
>
export const UpdateEventDocument = gql`
  mutation UpdateEvent($id: ID!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      id
      title
      description
      startsAt
      capacity
      owner {
        id
        firstName
        lastName
      }
      attendees {
        id
        firstName
        lastName
      }
    }
  }
`
export type UpdateEventMutationFn = Apollo.MutationFunction<
  UpdateEventMutation,
  UpdateEventMutationVariables
>

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEventMutation,
    UpdateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(
    UpdateEventDocument,
    options
  )
}
export type UpdateEventMutationHookResult = ReturnType<
  typeof useUpdateEventMutation
>
export type UpdateEventMutationResult =
  Apollo.MutationResult<UpdateEventMutation>
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<
  UpdateEventMutation,
  UpdateEventMutationVariables
>
