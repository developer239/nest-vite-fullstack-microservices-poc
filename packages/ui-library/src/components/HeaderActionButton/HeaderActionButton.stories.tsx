import { Meta, StoryObj } from '@storybook/react'
import { HeaderActionButton, IProps as HeaderActionButtonProps } from './index'

const meta: Meta<HeaderActionButtonProps> = {
  title: 'Components/HeaderActionButton',
  component: HeaderActionButton,
  argTypes: {
    actionType: {
      control: { type: 'select', options: ['close', 'back'] },
      description: 'Determines the type of action button, either close or back',
    },
  },
}

export default meta

export const CloseButton: StoryObj<HeaderActionButtonProps> = {
  args: {
    actionType: 'close',
    children: 'Close',
  },
}

export const BackButton: StoryObj<HeaderActionButtonProps> = {
  args: {
    actionType: 'back',
    children: 'Back',
  },
}
