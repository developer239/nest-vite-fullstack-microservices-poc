import { FAB } from '../FAB'
import PlusIcon from '../Icons/PlusIcon.tsx'

export const AddEventButton = ({ onAddEvent }: { onAddEvent: () => void }) => (
  <FAB name="add-event" type="button" onClick={onAddEvent}>
    <PlusIcon className="fill-white" />
  </FAB>
)
