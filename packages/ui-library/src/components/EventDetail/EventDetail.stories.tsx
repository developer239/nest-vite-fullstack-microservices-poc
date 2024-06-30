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
      capacity: 100,
      description: 'This is a sample event',
      startsAt: '2021-01-01T00:00:00Z',
    },
  },
  argTypes: {
    onDelete: {
      action: 'deletedEvent',
    },
  },
}

export default meta

export const Default: StoryObj<EventDetailProps> = {}
