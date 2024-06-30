import { useNavigate, useParams } from 'react-router-dom'
import { EventDetail, HeaderActionButton } from 'ui-library'
import {
  useDeleteEventMutation,
  useEventDetailQuery,
} from 'src/graphql-generated'
import { UserDropdownContainer } from 'src/modules/auth/components/UserDropdownContainer'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'
import { ContainerAttendanceButton } from 'src/modules/events/components/ContainerAttendanceButton'

export const EventDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, loading: isLoading } = useEventDetailQuery({
    variables: { id: id! },
  })
  const [deleteEvent, { loading: isDeleting }] = useDeleteEventMutation()

  const handleDelete = async () => {
    await deleteEvent({
      variables: { id: id! },
    })
    navigate('/')
  }

  return (
    <PrivateLayout
      headerRight={<UserDropdownContainer />}
      headerCenter={
        <HeaderActionButton href="/" actionType="back">
          Back to events
        </HeaderActionButton>
      }
    >
      {!isLoading && data?.event && (
        <EventDetail
          data={data.event}
          isDeleting={isDeleting}
          onDelete={handleDelete}
          renderAttendanceButton={(eventUI) => (
            <ContainerAttendanceButton event={eventUI} />
          )}
        />
      )}
    </PrivateLayout>
  )
}
