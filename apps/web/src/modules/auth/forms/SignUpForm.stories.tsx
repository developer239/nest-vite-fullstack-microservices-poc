import { Meta, StoryObj } from '@storybook/react'
import { SignUpForm, ISignUpFormProps } from './SignUpForm'

const meta: Meta<ISignUpFormProps> = {
  title: 'Forms/SignUpForm',
  component: SignUpForm,
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  args: {
    isLoading: false,
  },
}

export default meta

export const Default: StoryObj<ISignUpFormProps> = {}

export const Loading: StoryObj<ISignUpFormProps> = {
  args: {
    isLoading: true,
  },
}
