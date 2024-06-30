import { EventDetail, HeaderActionButton, UserDropdown } from 'ui-library'
import { PrivateLayout } from '../../core/components/PrivateLayout'

export const EventDetailPage = () => (
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
    headerCenter={
      <HeaderActionButton href="/" actionType="back">
        Back to events
      </HeaderActionButton>
    }
  >
    <EventDetail
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
      isLoading={false}
      onUpdate={() => undefined}
      onDelete={() => undefined}
    />
  </PrivateLayout>
)
