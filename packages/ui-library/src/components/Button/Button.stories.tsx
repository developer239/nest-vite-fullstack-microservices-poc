import { Meta, StoryObj } from '@storybook/react'
import { Button, IProps } from './index'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    isBrand: {
      control: 'boolean',
      description: 'Apply the brand-specific styles',
    },
    isSmaller: {
      control: 'boolean',
      description: 'Apply smaller button styles',
    },
    isDanger: {
      control: 'boolean',
      description: 'Apply the danger-specific styles',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state with a spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
  args: {
    isBrand: false,
    isSmaller: false,
    isDanger: false,
    isLoading: false,
    disabled: false,
    children: 'Button',
  },
} as Meta<IProps>

export const Default: StoryObj<IProps> = {
  render: (args) => <Button {...args} />,
}

export const Brand: StoryObj<IProps> = {
  args: {
    isBrand: true,
    children: 'Brand Button',
  },
}

export const Small: StoryObj<IProps> = {
  args: {
    isSmaller: true,
    children: 'Small Button',
  },
}

export const Danger: StoryObj<IProps> = {
  args: {
    isDanger: true,
    children: 'Danger Button',
  },
}

export const Loading: StoryObj<IProps> = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
}

export const Disabled: StoryObj<IProps> = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}
