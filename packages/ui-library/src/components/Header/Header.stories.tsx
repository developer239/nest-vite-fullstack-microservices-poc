import { Meta, StoryObj } from '@storybook/react'
import { Header, Props as HeaderProps } from './index'

const meta: Meta<HeaderProps> = {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    logoFill: {
      control: 'color',
      description: 'Color fill for the logo icon',
    },
  },
}

export default meta

export const Default: StoryObj<HeaderProps> = {
  args: {
    logoFill: '#000000', // Default black logo
    center: <div>Center Content</div>,
    right: <div>Right Content</div>,
  },
}
