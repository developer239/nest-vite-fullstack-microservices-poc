import { Meta, StoryObj } from '@storybook/react'
import { SaveEventButton, SaveEventButtonProps } from './index'

const meta: Meta<SaveEventButtonProps> = {
  title: 'Components/SaveEventButton',
  component: SaveEventButton,
  args: {
    isLoading: false,
  },
}

export default meta

export const Default: StoryObj<SaveEventButtonProps> = {}
