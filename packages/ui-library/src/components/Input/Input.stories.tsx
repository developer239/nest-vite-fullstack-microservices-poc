import { Meta, StoryObj } from '@storybook/react'
import { Input, IProps as InputProps } from './index'

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    id: {
      control: 'text',
      description: 'Input identifier',
    },
    type: {
      control: { type: 'select', options: ['text', 'password', 'email'] },
      description: 'Type of the input field',
    },
    hasError: {
      control: 'boolean',
      description: 'Indicates if the input field has an error',
    },
  },
}

export default meta

export const Default: StoryObj<InputProps> = {
  args: {
    id: 'input-id',
    type: 'text',
  },
}

export const Password: StoryObj<InputProps> = {
  args: {
    id: 'password-id',
    type: 'password',
  },
}

export const WithError: StoryObj<InputProps> = {
  args: {
    id: 'error-id',
    type: 'email',
    hasError: true,
  },
}
