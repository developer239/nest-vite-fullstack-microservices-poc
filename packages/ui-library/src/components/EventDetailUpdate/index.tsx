import { EventDetailControls } from '../EventDetailControls'
import { EventAttendeesCard } from '../EventAttendeesCard'
import { IEventUI } from '../../types.ts'

export type EventDetailUpdateProps = {
  data: IEventUI
  isDeleting: boolean
  onDelete: (event: IEventUI) => void
  children?: React.ReactNode
}

export const EventDetailUpdate = ({
  data,
  isDeleting,
  onDelete,
  children,
}: EventDetailUpdateProps) => (
  <>
    <EventDetailControls
      event={data}
      isDeletable
      isDeleting={isDeleting}
      onDelete={() => onDelete(data)}
      className="mb-[4rem]"
    />
    <div className="flex gap-[1.7rem] flex-col md:flex-row">
      {children}
      <EventAttendeesCard attendees={data.attendees} className="w-2/5" />
    </div>
  </>
)
