import { UserProfile } from 'ui-library'
import { useMeQuery } from 'src/graphql-generated'
import { UserDropdownContainer } from 'src/modules/auth/components/UserDropdownContainer'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'

export const ProfilePage = () => {
  const { data, loading: isLoading } = useMeQuery()

  // TODO: update me query to include events
  const events: any = []

  const handleOnUpdate = () => {
    // TODO: implement
  }

  return (
    <PrivateLayout headerRight={<UserDropdownContainer />}>
      <UserProfile
        user={data?.me}
        isLoading={isLoading}
        events={events}
        onUpdate={handleOnUpdate}
      />
    </PrivateLayout>
  )
}
