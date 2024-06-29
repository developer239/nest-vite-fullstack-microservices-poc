import { Meta, StoryObj } from '@storybook/react'
import { EventDetailControls, EventDetailControlsProps } from './index'

const meta: Meta<EventDetailControlsProps> = {
  title: 'Components/EventDetailControls',
  component: EventDetailControls,
  args: {
    event: { id: '1' },
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
