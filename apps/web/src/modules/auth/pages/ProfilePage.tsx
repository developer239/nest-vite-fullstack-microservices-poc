import { UserDropdown, UserProfile } from 'ui-library'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'

export const ProfilePage = () => (
  // TODO: load data
  <PrivateLayout
    headerRight={
      <UserDropdown
        user={{
          id: '1',
          email: 'asf@asd.cm',
          firstName: 'John',
          lastName: 'Doe',
        }}
        onLogout={() => undefined}
      />
    }
  >
    <UserProfile
      user={{
        id: '1',
        email: 'asdf@asdf.cm',
        firstName: 'John',
        lastName: 'Doe',
      }}
      isLoading={false}
      events={[]}
      onUpdate={() => undefined}
    />
  </PrivateLayout>
)
