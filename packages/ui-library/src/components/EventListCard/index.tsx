import { Card } from '../Card'
import { ISOStringToReadable } from '../../utils/date.ts'
import { AttendanceButton } from '../AttendanceButton'
import { IEventUI } from '../../types.ts'

export type EventListCardProps = {
  onUpdate?: (event: IEventUI) => void
  event: IEventUI
  authenticatedUserId?: string
  onJoin?: (event: IEventUI, authenticatedUserId: string) => void
  onLeave?: (event: IEventUI, authenticatedUserId: string) => void
}

// TODO: replace "a" with "Link" from "react-router-dom"

export const EventListCard = ({
  event,
  onUpdate,
  authenticatedUserId,
  onJoin,
  onLeave,
}: EventListCardProps) => (
  <Card
    uri={`/event/${event.id}`}
    className="flex flex-col md:grid md:grid-cols-5 md:gap-4 p-[2.4rem]"
  >
    <a
      href={`/event/${event.id}`}
      className="order-2 flex items-center justify-left overflow-hidden text-limed-spruce text-lg font-primary whitespace-nowrap text-ellipsis"
    >
      <span className="first-letter:uppercase w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {event.title}
      </span>
    </a>
    <a
      href={`/event/${event.id}`}
      className="mb-[4rem] md:mb-0 order-4 flex items-center justify-left overflow-hidden text-regent-gray text-base font-primary whitespace-nowrap overflow-ellipsis"
    >
      <p className="first-letter:uppercase w-full overflow-hidden text-ellipsis whitespace-nowrap">
        {event.description}
      </p>
    </a>
    <a
      href={`/event/${event.id}`}
      className="mb-[3.2rem] md:mb-0 order-3 flex items-center justify-left text-sm font-primary text-boulder"
    >
      {event.owner.firstName} {event.owner.lastName}
    </a>
    <a
      href={`/event/${event.id}`}
      className="mb-[1rem] md:mb-0 order-1 flex items-center justify-left text-iron text-sm font-primary"
    >
      {ISOStringToReadable(event.startsAt)}
    </a>
    <div className="order-5 flex flex-row justify-between">
      <span className="flex items-center justify-center text-sm text-regent-gray font-primary">
        {event.attendees.length} of {event.capacity}
      </span>
      {authenticatedUserId && (
        <AttendanceButton
          onUpdate={onUpdate}
          event={event}
          isAttending={false}
          isLeaving={false}
          onJoin={() => {
            if (onJoin) {
              onJoin(event, authenticatedUserId)
            }
          }}
          onLeave={() => {
            if (onLeave) {
              onLeave(event, authenticatedUserId)
            }
          }}
          authenticatedUserId={authenticatedUserId}
        />
      )}
    </div>
  </Card>
)
