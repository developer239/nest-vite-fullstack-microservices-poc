import { Meta, StoryObj } from '@storybook/react'
import { Spinner, IProps } from './index'

const meta: Meta<IProps> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    isSmaller: {
      control: 'boolean',
      description: 'Toggle for smaller size',
    },
    isLight: {
      control: 'boolean',
      description: 'Toggle for light color spinner',
    },
  },
  args: {
    isSmaller: false,
    isLight: false,
  },
}

export default meta

export const Default: StoryObj<IProps> = {
  args: {
    isSmaller: false,
    isLight: false,
  },
}

export const SmallDark: StoryObj<IProps> = {
  args: {
    isSmaller: true,
    isLight: false,
  },
}

export const LargeLight: StoryObj<IProps> = {
  args: {
    isSmaller: false,
    isLight: true,
  },
}

export const SmallLight: StoryObj<IProps> = {
  args: {
    isSmaller: true,
    isLight: true,
  },
}
