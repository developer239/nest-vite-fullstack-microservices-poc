import { JSX } from 'react'
import { FAB } from '../FAB'
import SaveIcon from '../Icons/SaveIcon.tsx'

export type SaveEventButtonProps = {
  isLoading?: boolean
} & JSX.IntrinsicElements['button']

export const SaveEventButton = ({
  isLoading,
  ...props
}: SaveEventButtonProps) => (
  <FAB
    name="save-event"
    type="submit"
    form="update-event-form"
    isBrand
    {...props}
  >
    <SaveIcon className="fill-white" />
  </FAB>
)
