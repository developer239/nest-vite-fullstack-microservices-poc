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
      id: '1',
      title: 'Annual Tech Conference',
      description: 'Join us for an engaging tech conference...',
      startsAt: new Date().toISOString(),
      capacity: 300,
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
