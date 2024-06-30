import { useNavigate } from 'react-router-dom'
import { AttendanceButton, IEventUI } from 'ui-library'
import {
  EventDetailDocument,
  ListEventsDocument,
  useAttendEventMutation,
  useMeQuery,
  useUnattendEventMutation,
} from 'src/graphql-generated'

export interface IAttendanceButtonProps {
  readonly event: IEventUI
}

export const ContainerAttendanceButton = ({
  event,
}: IAttendanceButtonProps) => {
  const navigate = useNavigate()
  const [attendEvent, { loading: isAttending }] = useAttendEventMutation({
    refetchQueries: [
      {
        query: EventDetailDocument,
        variables: { eventId: event.id },
      },
      {
        query: ListEventsDocument,
      },
    ],
  })
  const [unattendEvent, { loading: isLeaving }] = useUnattendEventMutation({
    refetchQueries: [
      {
        query: EventDetailDocument,
        variables: { eventId: event.id },
      },
      {
        query: ListEventsDocument,
      },
    ],
  })
  const { data: dataMe } = useMeQuery()

  const handleJoin = async () => {
    await attendEvent({ variables: { eventId: event.id } })
  }

  const handleLeave = async () => {
    await unattendEvent({ variables: { eventId: event.id } })
  }

  const handleEdit = () => {
    navigate(`/event/${event.id}/edit`)
  }

  return (
    <AttendanceButton
      event={event}
      isAttending={isAttending}
      isLeaving={isLeaving}
      onJoin={handleJoin}
      onLeave={handleLeave}
      onUpdate={handleEdit}
      authenticatedUserId={dataMe?.me.id}
    />
  )
}
