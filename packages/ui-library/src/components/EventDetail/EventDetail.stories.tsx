import { Meta, StoryObj } from '@storybook/react'
import { EventDetail, EventDetailProps } from './index'

const meta: Meta<EventDetailProps> = {
  title: 'Components/EventDetail',
  component: EventDetail,
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
    isLoading: false,
  },
  argTypes: {
    onUpdate: {
      action: 'updatedEvent',
      table: {
        type: {
          summary: 'function',
          detail: 'function(event: EventDTO): void',
        },
      },
    },
    onDelete: {
      action: 'deletedEvent',
      table: {
        type: {
          summary: 'function',
          detail: 'function(event: EventDTO): void',
        },
      },
    },
  },
}

export default meta

export const Default: StoryObj<EventDetailProps> = {}
