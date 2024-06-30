import { Meta, StoryObj } from '@storybook/react'
import { LoginForm, ILoginFormProps } from './LoginForm'

const meta: Meta<ILoginFormProps> = {
  title: 'Forms/LoginForm',
  component: LoginForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  args: {
    isLoading: false,
  },
}

export default meta

export const Default: StoryObj<ILoginFormProps> = {}

export const Loading: StoryObj<ILoginFormProps> = {
  args: {
    isLoading: true,
  },
}
