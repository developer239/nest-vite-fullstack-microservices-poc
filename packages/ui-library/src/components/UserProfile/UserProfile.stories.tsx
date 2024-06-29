import { Meta, StoryObj } from '@storybook/react'
import { UserProfile, UserProfileProps } from './index'

const meta: Meta<UserProfileProps> = {
  title: 'Components/UserProfile',
  component: UserProfile,
  args: {
    authenticatedUserId: 1,
    data: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      events: [
        {
          title: 'Sample Event',
          attendees: [
            { id: '1', firstName: 'John', lastName: 'Doe' },
            { id: '2', firstName: 'Jane', lastName: 'Doe' },
            { id: '3', firstName: 'John', lastName: 'Smith' },
            { id: '4', firstName: 'Jane', lastName: 'Smith' },
          ],
          owner: { id: 1, firstName: 'Alice', lastName: 'Smith' },
          currentUser: '3',
          capacity: 100,
          description: 'This is a sample event',
        },
      ],
    },
  },
  argTypes: {
    onUpdate: { action: 'onUpdate' },
  },
}

export default meta

export const Default: StoryObj<UserProfileProps> = {}
