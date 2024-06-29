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

const OWNER_USER_ID = 1
const ATTENDEE_USER_ID = 2
const OTHER_USER_ID = 3

export const Default: StoryObj<IProps> = {
  args: {
    authenticatedUserId: OTHER_USER_ID,
    event: {
      id: 1,
      owner: { id: OWNER_USER_ID },
      attendees: [{ id: ATTENDEE_USER_ID }],
      capacity: 10,
    },
    isAttending: false,
    isLeaving: false,
  },
}

export const AttendeeView: StoryObj<IProps> = {
  args: {
    authenticatedUserId: ATTENDEE_USER_ID,
    event: {
      id: 1,
      owner: { id: OWNER_USER_ID },
      attendees: [{ id: ATTENDEE_USER_ID }],
      capacity: 10,
    },
    isAttending: false,
    isLeaving: false,
  },
}

export const OwnerView: StoryObj<IProps> = {
  args: {
    authenticatedUserId: OWNER_USER_ID,
    event: {
      id: 1,
      owner: { id: OWNER_USER_ID },
      attendees: [{ id: ATTENDEE_USER_ID }],
      capacity: 10,
    },
    isAttending: false,
    isLeaving: false,
  },
}

export const FullEvent: StoryObj<IProps> = {
  args: {
    authenticatedUserId: OTHER_USER_ID,
    event: {
      id: 1,
      owner: { id: OWNER_USER_ID },
      attendees: [{ id: ATTENDEE_USER_ID }],
      capacity: 1,
    },
    isAttending: false,
    isLeaving: false,
  },
}
