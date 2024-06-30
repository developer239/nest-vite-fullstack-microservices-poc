import { EventDetailUpdate, UserDropdown } from 'ui-library'
import { PrivateLayout } from '../../core/components/PrivateLayout'

export const EventEditPage = () => (
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
    <EventDetailUpdate
      data={{
        id: '1',
        title: 'Sample Event',
        attendees: [
          { id: '1', firstName: 'John', lastName: 'Doe' },
          { id: '2', firstName: 'Jane', lastName: 'Doe' },
          { id: '3', firstName: 'John', lastName: 'Smith' },
          { id: '4', firstName: 'Jane', lastName: 'Smith' },
        ],
        owner: { id: '2', firstName: 'Alice', lastName: 'Smith' },
        capacity: 100,
        description: 'This is a sample event',
        startsAt: '2021-01-01T00:00:00Z',
      }}
      isUpdating={false}
      isDeleting={false}
      onUpdate={() => undefined}
    />
  </PrivateLayout>
)
