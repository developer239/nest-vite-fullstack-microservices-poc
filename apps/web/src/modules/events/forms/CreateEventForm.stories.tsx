import { Meta, StoryObj } from '@storybook/react'
import { CreateEventForm, ICreateEventFormProps } from './CreateEventForm'

const meta: Meta<ICreateEventFormProps> = {
  title: 'Forms/CreateEventForm',
  component: CreateEventForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  args: {
    isLoading: false,
  },
}

export default meta

export const Default: StoryObj<ICreateEventFormProps> = {}

export const Loading: StoryObj<ICreateEventFormProps> = {
  args: {
    isLoading: true,
  },
}
