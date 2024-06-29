import { Meta, StoryObj } from '@storybook/react'
import { UserDropdown, UserDropdownProps } from './index'

const meta: Meta<UserDropdownProps> = {
  title: 'Components/UserDropdown',
  component: UserDropdown,
  args: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
    },
    onLogout: () => alert('Logging out...'),
  },
}

export default meta

export const Default: StoryObj<UserDropdownProps> = {}
