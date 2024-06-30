import { Meta, StoryObj } from '@storybook/react'
import { Card, IProps as CardProps } from './index'

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    uri: {
      control: 'text',
      description: 'Resource identifier URI for the card',
    },
  },
}

export default meta

export const Default: StoryObj<CardProps> = {
  args: {
    children: 'This is a card component',
  },
}
