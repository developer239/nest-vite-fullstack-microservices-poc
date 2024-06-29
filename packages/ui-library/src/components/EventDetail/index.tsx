import { EventGridCard } from '../EventGridCard'
import { EventAttendeesCard } from '../EventAttendeesCard'
import { EventDetailControls } from '../EventDetailControls'
import { IEventUI } from '../../types.ts'

export type EventDetailProps = {
  data: IEventUI
  onUpdate: (event: IEventUI) => void
  onDelete: (event: IEventUI) => void
  isLoading: boolean
}

export const EventDetail = ({
  data,
  onUpdate,
  onDelete,
  isLoading,
}: EventDetailProps) => (
  <>
    <EventDetailControls
      isLoading={isLoading}
      event={data}
      isDeletable
      className="mb-[4rem]"
      onDelete={onDelete}
    />
    <div className="flex gap-[1.7rem] flex-col md:flex-row">
      <EventGridCard
        onUpdate={onUpdate}
        isDetail
        event={data}
        className="w-3/5"
      />
      <EventAttendeesCard attendees={data.attendees} className="w-2/5" />
    </div>
  </>
)
