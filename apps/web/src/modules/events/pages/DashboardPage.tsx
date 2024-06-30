import { useNavigate } from 'react-router-dom'
import { AddEventButton, EventsList } from 'ui-library'
import { useListEventsQuery } from 'src/graphql-generated'
import { UserDropdownContainer } from 'src/modules/auth/components/UserDropdownContainer'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'

export const DashboardPage = () => {
  const { data, loading: isLoading } = useListEventsQuery()
  const navigate = useNavigate()

  const handleOnAddEvent = () => {
    navigate('/events/create')
  }

  console.log(isLoading)
  console.log(data)

  return (
    <PrivateLayout headerRight={<UserDropdownContainer />}>
      <EventsList isLoading={isLoading} data={data} />
      <AddEventButton onAddEvent={handleOnAddEvent} />
    </PrivateLayout>
  )
}
