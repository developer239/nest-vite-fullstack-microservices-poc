import { UserProfile } from 'ui-library'
import { useMeQuery } from 'src/graphql-generated'
import { UserDropdownContainer } from 'src/modules/auth/components/UserDropdownContainer'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'
import { ContainerAttendanceButton } from 'src/modules/events/components/ContainerAttendanceButton'

export const ProfilePage = () => {
  const { data, loading: isLoading } = useMeQuery()

  // TODO: update me query to include events
  const events: any = []

  return (
    <PrivateLayout headerRight={<UserDropdownContainer />}>
      <UserProfile
        user={data?.me}
        isLoading={isLoading}
        events={events}
        renderAttendanceButton={(eventUI) => (
          <ContainerAttendanceButton event={eventUI} />
        )}
      />
    </PrivateLayout>
  )
}
