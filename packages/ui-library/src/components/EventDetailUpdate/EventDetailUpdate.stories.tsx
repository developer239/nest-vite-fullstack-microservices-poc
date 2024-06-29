import { Meta, StoryObj } from '@storybook/react'
import { EventDetailUpdate, EventDetailUpdateProps } from './index'

const meta: Meta<EventDetailUpdateProps> = {
  title: 'Components/EventDetailUpdate',
  component: EventDetailUpdate,
  args: {
    data: {
      id: '1',
      title: 'Sample Event',
      attendees: [
        { id: '1', firstName: 'John', lastName: 'Doe' },
        { id: '2', firstName: 'Jane', lastName: 'Doe' },
        { id: '3', firstName: 'John', lastName: 'Smith' },
        { id: '4', firstName: 'Jane', lastName: 'Smith' },
      ],
      owner: { id: '2', firstName: 'Alice', lastName: 'Smith' },
      currentUser: '3',
      capacity: 100,
      description: 'This is a sample event',
    },
  },
}

export default meta

export const Default: StoryObj<EventDetailUpdateProps> = {}
