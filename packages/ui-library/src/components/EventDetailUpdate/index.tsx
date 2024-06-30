import { EventDetailControls } from '../EventDetailControls'
import { EventAttendeesCard } from '../EventAttendeesCard'
import { IEventUI } from '../../types.ts'

export type EventDetailUpdateProps = {
  data: IEventUI
  isUpdating: boolean
  isDeleting: boolean
  onUpdate: (event: IEventUI) => void
  children?: React.ReactNode
}

export const EventDetailUpdate = ({
  data,
  isDeleting,
  isUpdating,
  onUpdate,
  children,
}: EventDetailUpdateProps) => {
  if (isUpdating || !data) {
    return null
  }

  return (
    <>
      <EventDetailControls
        event={data}
        isDeletable
        isLoading={isDeleting}
        onDelete={() => onUpdate(data)}
        className="mb-[4rem]"
      />
      <div className="flex gap-[1.7rem] flex-col md:flex-row">
        {children}
        <EventAttendeesCard attendees={data.attendees} className="w-2/5" />
      </div>
    </>
  )
}
