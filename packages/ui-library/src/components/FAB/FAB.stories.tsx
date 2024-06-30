import { Meta, StoryObj } from '@storybook/react'
import { FAB, IProps as FABProps } from './index'

const meta: Meta<FABProps> = {
  title: 'Components/FAB',
  component: FAB,
  argTypes: {
    isBrand: {
      control: 'boolean',
      description: 'Apply the brand-specific styles',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state with a spinner',
    },
  },
}

export default meta

export const Primary: StoryObj<FABProps> = {
  args: {
    children: 'FAB',
  },
}

export const Brand: StoryObj<FABProps> = {
  args: {
    isBrand: true,
    children: 'Brand FAB',
  },
}

export const Loading: StoryObj<FABProps> = {
  args: {
    isLoading: true,
  },
}
