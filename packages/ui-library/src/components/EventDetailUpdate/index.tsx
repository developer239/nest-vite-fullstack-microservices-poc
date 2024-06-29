import { EventDetailControls } from '../EventDetailControls'
import { EventAttendeesCard } from '../EventAttendeesCard'
import { EventDTO } from '../../types.ts'

export type EventDetailUpdateProps = {
  data: EventDTO
  isUpdating: boolean
  isDeleting: boolean
  onUpdate: (event: EventDTO) => void
}

export const EventDetailUpdate = ({
  data,
  isDeleting,
  isUpdating,
  onUpdate,
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
        {/*TODO add form*/}
        {/*<UpdateEventForm data={data} className="w-3/5 max-w-[9999rem]" />*/}
        <EventAttendeesCard attendees={data.attendees} className="w-2/5" />
      </div>
    </>
  )
}
