import { Meta, StoryObj } from '@storybook/react'
import { UserProfile, UserProfileProps } from './index'

const meta: Meta<UserProfileProps> = {
  title: 'Components/UserProfile',
  component: UserProfile,
  args: {
    user: {
      id: '1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
    },
    events: [
      {
        id: '1',
        title: 'Sample Event',
        attendees: [
          { id: '1', firstName: 'John', lastName: 'Doe' },
          { id: '2', firstName: 'Jane', lastName: 'Doe' },
          { id: '3', firstName: 'John', lastName: 'Smith' },
          { id: '4', firstName: 'Jane', lastName: 'Smith' },
        ],
        owner: { id: '1', firstName: 'Alice', lastName: 'Smith' },
        capacity: 100,
        description: 'This is a sample event',
        startsAt: '2021-09-01T12:00:00.000Z',
      },
    ],
  },
  argTypes: {
    onUpdate: { action: 'onUpdate' },
  },
}

export default meta

export const Default: StoryObj<UserProfileProps> = {}
