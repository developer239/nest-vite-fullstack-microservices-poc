import { Meta, StoryObj } from '@storybook/react'
import { EventDetailControls, EventDetailControlsProps } from './index'

const meta: Meta<EventDetailControlsProps> = {
  title: 'Components/EventDetailControls',
  component: EventDetailControls,
  args: {
    event: {
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
    isDeletable: true,
    isLoading: false,
  },
  argTypes: {
    onDelete: { action: 'deletedEvent' },
  },
}

export default meta

export const Default: StoryObj<EventDetailControlsProps> = {}

export const Loading: StoryObj<EventDetailControlsProps> = {
  args: {
    isLoading: true,
  },
}
