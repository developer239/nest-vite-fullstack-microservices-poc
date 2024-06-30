import { AddEventButton, EventsList, UserDropdown } from 'ui-library'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'

export const DashboardPage = () => (
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
    <EventsList isLoading={false} data={[]} />
    <AddEventButton onAddEvent={() => undefined} />
  </PrivateLayout>
)
