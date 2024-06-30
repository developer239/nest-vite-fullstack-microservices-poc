import { EventGridCard } from '../EventGridCard'
import { EventAttendeesCard } from '../EventAttendeesCard'
import { EventDetailControls } from '../EventDetailControls'
import { IEventUI } from '../../types.ts'
import { ReactNode } from 'react'

export type EventDetailProps = {
  data: IEventUI
  onDelete: (event: IEventUI) => void
  isDeleting: boolean
  renderAttendanceButton?: (event: IEventUI) => ReactNode
}

export const EventDetail = ({
  data,
  onDelete,
  isDeleting,
  renderAttendanceButton,
}: EventDetailProps) => (
  <>
    <EventDetailControls
      isDeleting={isDeleting}
      event={data}
      isDeletable
      className="mb-[4rem]"
      onDelete={onDelete}
    />
    <div className="flex gap-[1.7rem] flex-col md:flex-row">
      <EventGridCard
        isDetail
        event={data}
        className="w-3/5"
        renderAttendanceButton={renderAttendanceButton}
      />
      <EventAttendeesCard attendees={data.attendees} className="w-2/5" />
    </div>
  </>
)
