import { Meta, StoryObj } from '@storybook/react'
import { EventListCard, EventListCardProps } from './index'

const meta: Meta<EventListCardProps> = {
  title: 'Components/EventListCard',
  component: EventListCard,
  args: {
    authenticatedUserId: '99',
    event: {
      id: '1',
      title: 'Open Source Summit',
      description: 'Explore new trends in open source...',
      startsAt: new Date().toISOString(),
      attendees: [],
      owner: { id: '2', firstName: 'Bob', lastName: 'Baker' },
      capacity: 200,
    },
  },
}

export default meta

export const Default: StoryObj<EventListCardProps> = {}
