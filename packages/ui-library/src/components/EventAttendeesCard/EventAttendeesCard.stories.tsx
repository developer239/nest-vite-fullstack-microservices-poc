import { Meta, StoryObj } from '@storybook/react'
import { EventAttendeesCard, EventAttendeesProps } from './index'

const meta: Meta<EventAttendeesProps> = {
  title: 'Components/EventAttendeesCard',
  component: EventAttendeesCard,
  args: {
    attendees: [
      { id: '1', firstName: 'John', lastName: 'Doe' },
      { id: '2', firstName: 'Jane', lastName: 'Doe' },
      { id: '3', firstName: 'John', lastName: 'Smith' },
      { id: '4', firstName: 'Jane', lastName: 'Smith' },
    ],
  },
}

export default meta

export const Default: StoryObj<EventAttendeesProps> = {}
