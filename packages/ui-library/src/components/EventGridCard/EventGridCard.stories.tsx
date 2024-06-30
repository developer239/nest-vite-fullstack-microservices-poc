import { Meta, StoryObj } from '@storybook/react'
import { EventGridCard, EventGridCardProps } from './index'

const meta: Meta<EventGridCardProps> = {
  title: 'Components/EventGridCard',
  component: EventGridCard,
  args: {
    event: {
      id: '1',
      title: 'Annual Tech Conference',
      description: 'Join us for an engaging tech conference...',
      startsAt: new Date().toISOString(),
      attendees: [],
      owner: { id: '2', firstName: 'Alice', lastName: 'Smith' },
      capacity: 300,
    },
  },
}

export default meta

export const Default: StoryObj<EventGridCardProps> = {}
