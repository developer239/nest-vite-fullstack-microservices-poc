import { Meta, StoryObj } from '@storybook/react'
import { AttendanceButton, IProps } from './index'

const meta: Meta<IProps> = {
  title: 'Components/AttendanceButton',
  component: AttendanceButton,
  argTypes: {
    onJoin: { action: 'joinedEvent' },
    onLeave: { action: 'leftEvent' },
    onUpdate: { action: 'updatedEvent' },
  },
}

export default meta

const OWNER_USER_ID = '1'
const ATTENDEE_USER_ID = '2'
const OTHER_USER_ID = '3'

export const Default: StoryObj<IProps> = {
  args: {
    authenticatedUserId: OTHER_USER_ID,
    event: {
      id: '1',
      owner: { id: OWNER_USER_ID, firstName: 'John', lastName: 'Doe' },
      attendees: [{ id: ATTENDEE_USER_ID, firstName: 'Jane', lastName: 'Doe' }],
      capacity: 10,
      title: 'Event Title',
      description: 'Event Description',
      startsAt: '2021-01-01T00:00:00Z',
    },
    isAttending: false,
    isLeaving: false,
  },
}

export const AttendeeView: StoryObj<IProps> = {
  args: {
    authenticatedUserId: ATTENDEE_USER_ID,
    event: {
      id: '1',
      owner: { id: OWNER_USER_ID, firstName: 'John', lastName: 'Doe' },
      attendees: [{ id: ATTENDEE_USER_ID, firstName: 'Jane', lastName: 'Doe' }],
      capacity: 10,
      title: 'Event Title',
      description: 'Event Description',
      startsAt: '2021-01-01T00:00:00Z',
    },
    isAttending: false,
    isLeaving: false,
  },
}

export const OwnerView: StoryObj<IProps> = {
  args: {
    authenticatedUserId: OWNER_USER_ID,
    event: {
      id: '1',
      owner: { id: OWNER_USER_ID, firstName: 'John', lastName: 'Doe' },
      attendees: [{ id: ATTENDEE_USER_ID, firstName: 'Jane', lastName: 'Doe' }],
      capacity: 10,
      title: 'Event Title',
      description: 'Event Description',
      startsAt: '2021-01-01T00:00:00Z',
    },
    isAttending: false,
    isLeaving: false,
  },
}

export const FullEvent: StoryObj<IProps> = {
  args: {
    authenticatedUserId: OTHER_USER_ID,
    event: {
      id: '1',
      owner: { id: OWNER_USER_ID, firstName: 'John', lastName: 'Doe' },
      attendees: [{ id: ATTENDEE_USER_ID, firstName: 'Jane', lastName: 'Doe' }],
      capacity: 1,
      title: 'Event Title',
      description: 'Event Description',
      startsAt: '2021-01-01T00:00:00Z',
    },
    isAttending: false,
    isLeaving: false,
  },
}
