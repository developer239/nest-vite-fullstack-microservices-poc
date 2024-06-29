import { Button } from '../Button'

// TODO: Add types
export type EventDTO = any

export enum AttendanceState {
  default = 'default',
  mine = 'mine',
  joined = 'joined',
  past = 'past',
  full = 'full',
}

export type IProps = {
  event: EventDTO
  isAttending: boolean
  isLeaving: boolean
  onJoin: () => void
  onLeave: () => void
  onUpdate?: (event: EventDTO) => void
  authenticatedUserId?: number
}

// TODO: should disable when event is in the past
export const AttendanceButton = ({
  event,
  isAttending,
  isLeaving,
  onJoin,
  onLeave,
  onUpdate,
  authenticatedUserId,
}: IProps) => {
  const handleJoin = async () => {
    onJoin()
  }

  const handleLeave = async () => {
    onLeave()
  }

  const getState = () => {
    if (event.owner.id === authenticatedUserId) return AttendanceState.mine
    if (
      event.attendees.some(
        // TODO: remove any when typed properly
        (attendee: any) => attendee.id === authenticatedUserId
      )
    )
      return AttendanceState.joined
    if (event.attendees.length >= event.capacity) return AttendanceState.full
    return AttendanceState.default
  }

  const state = getState()

  switch (state) {
    case AttendanceState.full:
      return (
        <Button isSmaller disabled type="button">
          Full
        </Button>
      )
    case AttendanceState.mine:
      return (
        <Button
          isSmaller
          type="button"
          onClick={() => {
            if (onUpdate) {
              onUpdate(event)
            }
          }}
        >
          Edit
        </Button>
      )
    case AttendanceState.joined:
      return (
        <Button
          isSmaller
          isDanger
          type="button"
          onClick={handleLeave}
          isLoading={isLeaving}
        >
          Leave
        </Button>
      )
    default:
      return (
        <Button
          isSmaller
          isBrand
          type="button"
          onClick={handleJoin}
          isLoading={isAttending}
        >
          Join
        </Button>
      )
  }
}
