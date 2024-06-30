import { useNavigate } from 'react-router-dom'
import { AddEventButton, EventsList } from 'ui-library'
import { useListEventsQuery } from 'src/graphql-generated'
import { UserDropdownContainer } from 'src/modules/auth/components/UserDropdownContainer'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'
import { ContainerAttendanceButton } from 'src/modules/events/components/ContainerAttendanceButton'

export const DashboardPage = () => {
  const { data, loading: isLoading } = useListEventsQuery()
  const navigate = useNavigate()

  const handleOnAddEvent = () => {
    navigate('/event/create')
  }

  return (
    <PrivateLayout headerRight={<UserDropdownContainer />}>
      <EventsList
        isLoading={isLoading}
        data={data?.events}
        renderAttendanceButton={(eventUI) => (
          <ContainerAttendanceButton event={eventUI} />
        )}
      />
      <AddEventButton onAddEvent={handleOnAddEvent} />
    </PrivateLayout>
  )
}
