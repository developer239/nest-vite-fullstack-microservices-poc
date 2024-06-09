import { Meta, StoryObj } from '@storybook/react'
import ArrowBackIcon from './ArrowBackIcon'
import CloseIcon from './CloseIcon'
import DeleteIcon from './DeleteIcon'
import DropdownIcon from './DropdownIcon'
import GridIcon from './GridIcon'
import ListViewIcon from './ListViewIcon'
import LogoIcon from './LogoIcon'
import PlusIcon from './PlusIcon'
import SaveIcon from './SaveIcon'
import ShowIcon from './ShowIcon'
import UserIcon from './UserIcon'

const meta: Meta = {
  title: 'Components/Icons',
  component: ArrowBackIcon, // This can be any, doesn't impact the story in this case
}

export default meta

const Template: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
      }}
    >
      <div>
        <ArrowBackIcon />
        <p>ArrowBackIcon</p>
      </div>
      <div>
        <CloseIcon />
        <p>CloseIcon</p>
      </div>
      <div>
        <DeleteIcon />
        <p>DeleteIcon</p>
      </div>
      <div>
        <DropdownIcon />
        <p>DropdownIcon</p>
      </div>
      <div>
        <GridIcon />
        <p>GridIcon</p>
      </div>
      <div>
        <ListViewIcon />
        <p>ListViewIcon</p>
      </div>
      <div>
        <LogoIcon />
        <p>LogoIcon</p>
      </div>
      <div>
        <PlusIcon />
        <p>PlusIcon</p>
      </div>
      <div>
        <SaveIcon />
        <p>SaveIcon</p>
      </div>
      <div>
        <ShowIcon />
        <p>ShowIcon</p>
      </div>
      <div>
        <UserIcon />
        <p>UserIcon</p>
      </div>
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

export const Icons: StoryObj = Template
