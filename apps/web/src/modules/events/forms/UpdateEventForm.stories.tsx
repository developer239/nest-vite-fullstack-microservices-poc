import { Meta, StoryObj } from '@storybook/react'
import { UpdateEventForm, IUpdateEventFormProps } from './UpdateEventForm'

const meta: Meta<IUpdateEventFormProps> = {
  title: 'Forms/UpdateEventForm',
  component: UpdateEventForm,
  argTypes: {
    onUpdateEvent: { action: 'updatedEvent' },
  },
  args: {
    data: {
      title: 'Event Title',
      description: 'Event Description',
      startsAtDay: '2022-01-01',
      startsAtTime: '12:00',
      capacity: 100,
    },
    isLoading: false,
  },
}

export default meta

export const Default: StoryObj<IUpdateEventFormProps> = {}

export const Loading: StoryObj<IUpdateEventFormProps> = {
  args: {
    isLoading: true,
  },
}
