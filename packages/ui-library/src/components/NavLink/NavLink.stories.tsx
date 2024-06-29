import { Meta, StoryObj } from '@storybook/react'
import { NavLink, IProps } from './index'

const meta: Meta<IProps> = {
  title: 'Components/NavLink',
  component: NavLink,
  argTypes: {
    left: {
      control: 'text',
      description: 'Left text of the nav link',
    },
    right: {
      control: 'text',
      description: 'Right text of the nav link',
    },
    slot: {
      control: 'text',
      description: 'Slot for responsive behavior',
    },
    href: {
      control: 'text',
      description: 'Href attribute for the link',
    },
  },
  args: {
    left: 'Home',
    right: 'Page',
    href: '#',
  },
}

export default meta

export const Default: StoryObj<IProps> = {
  args: {
    slot: undefined,
  },
}

export const WithSlot: StoryObj<IProps> = {
  args: {
    slot: 'sidebar',
  },
}
