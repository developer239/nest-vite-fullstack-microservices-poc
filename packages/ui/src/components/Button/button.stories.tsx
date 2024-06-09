import { Meta, StoryObj } from '@storybook/react'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    isBrand: { control: 'boolean' },
    isSmaller: { control: 'boolean' },
    isDanger: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    children: { control: 'text' },
    className: { control: 'text' },
    onClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}

export const Brand: Story = {
  args: {
    isBrand: true,
    children: 'Brand Button',
  },
}

export const Smaller: Story = {
  args: {
    isSmaller: true,
    children: 'Smaller Button',
  },
}

export const Danger: Story = {
  args: {
    isDanger: true,
    children: 'Danger Button',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading Button',
  },
}
