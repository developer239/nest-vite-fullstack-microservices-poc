import { useQuery } from '@apollo/client'
import { EventsList, TrooperOutlet } from 'ui-library'
import {
  ListEventsQuery,
  ListEventsDocument,
} from './_gql-generated/graphql.ts'

export const App = () => {
  const { data, loading: isLoading } =
    useQuery<ListEventsQuery>(ListEventsDocument)

  return (
    <>
      <TrooperOutlet />
      <EventsList
        data={data?.events}
        authenticatedUserId="2"
        isLoading={isLoading}
      />
    </>
  )
}
