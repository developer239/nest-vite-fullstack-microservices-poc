import { EventsList, TrooperOutlet } from 'ui-library'

const data = [
  {
    id: '1',
    title: 'Mine Event',
    description: 'This event is mine',
    owner: {
      id: '2',
      firstName: 'John',
      lastName: 'Doe',
    },
    startsAt: '2022-01-01T00:00:00Z',
    capacity: 100,
    attendees: [],
  },
  {
    id: '2',
    title: 'Others Event',
    description: 'This event was created by someone else',
    owner: {
      id: '99',
      firstName: 'Jane',
      lastName: 'Doe',
    },
    startsAt: '2022-01-02T00:00:00Z',
    capacity: 100,
    attendees: [],
  },
  {
    id: '3',
    title: 'Joined Event',
    description: 'I joined this event and should see a leave button',
    owner: {
      id: '99',
      firstName: 'Jonny',
      lastName: 'Doe',
    },
    startsAt: '2022-01-02T00:00:00Z',
    capacity: 100,
    attendees: [
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
      },
    ],
  },
  {
    id: '4',
    title: 'Full Event',
    description: 'This event is full and I am unable to join',
    owner: {
      id: '99',
      firstName: 'Jonny',
      lastName: 'Doe',
    },
    startsAt: '2022-01-02T00:00:00Z',
    capacity: 1,
    attendees: [
      {
        id: '3',
        firstName: 'John',
        lastName: 'Doe',
      },
    ],
  },
  {
    id: '5',
    title: 'Future Event',
    description:
      'This event is in the future and will be visible when filtering future events',
    owner: {
      id: '99',
      firstName: 'Jonny',
      lastName: 'Doe',
    },
    startsAt: '2099-01-02T00:00:00Z',
    capacity: 100,
    attendees: [],
  },
]

export const App = () => (
  <>
    <TrooperOutlet />
    <EventsList
      data={data}
      authenticatedUserId="2"
      isLoading={false}
      onUpdate={() => {}}
    />
  </>
)
