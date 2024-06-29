/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
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

export const ListEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ListEvents' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'capacity' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'owner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'attendees' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListEventsQuery, ListEventsQueryVariables>
