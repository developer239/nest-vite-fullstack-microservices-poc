import { Meta, StoryObj } from '@storybook/react'
import { AddEventButton } from './index'

const meta: Meta = {
  title: 'Components/AddEventButton',
  component: AddEventButton,
  argTypes: {
    onAddEvent: { action: 'addEventClicked' },
  },
}

export default meta

export const Default: StoryObj = {}
