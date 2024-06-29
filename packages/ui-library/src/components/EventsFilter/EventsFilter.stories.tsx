import { Meta, StoryObj } from '@storybook/react'
import { EventsFilter, EventsFilterProps } from './index'

const meta: Meta<EventsFilterProps> = {
  title: 'Components/EventsFilter',
  component: EventsFilter,
  args: {
    filterType: 'all',
    viewType: 'list',
  },
  argTypes: {
    changeFilterType: { action: 'changeFilterType' },
    changeViewType: { action: 'changeViewType' },
  },
}

export default meta

export const Default: StoryObj<EventsFilterProps> = {}
