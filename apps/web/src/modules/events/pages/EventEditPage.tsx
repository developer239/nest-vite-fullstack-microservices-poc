import dayjs from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
import { EventDetailUpdate } from 'ui-library'
import {
  useDeleteEventMutation,
  useEventDetailQuery,
  useUpdateEventMutation,
} from 'src/graphql-generated'
import { UserDropdownContainer } from 'src/modules/auth/components/UserDropdownContainer'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'
import { CreateEventFormData } from 'src/modules/events/forms/CreateEventForm'
import { UpdateEventForm } from 'src/modules/events/forms/UpdateEventForm'

export const EventEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useEventDetailQuery({
    variables: { id: id! },
  })
  const [updateEvent, { loading: isUpdating }] = useUpdateEventMutation()
  const [deleteEvent, { loading: isDeleting }] = useDeleteEventMutation()

  const handleDelete = async () => {
    await deleteEvent({
      variables: { id: id! },
    })
    navigate('/')
  }

  const handleUpdateEvent = async ({
    startsAtDay,
    startsAtTime,
    ...values
  }: CreateEventFormData) => {
    const startsAt = dayjs(`${startsAtDay} ${startsAtTime}`).toISOString()

    await updateEvent({
      variables: {
        id: id!,
        input: {
          ...values,
          startsAt,
        },
      },
    })
    navigate(`/events/${id}`)
  }

  return (
    <PrivateLayout headerRight={<UserDropdownContainer />}>
      {data && (
        <EventDetailUpdate
          data={data}
          isDeleting={isDeleting}
          onDelete={handleDelete}
        >
          <UpdateEventForm
            data={{
              title: data.event.title,
              capacity: data.event.capacity,
              description: data.event.description,
              startsAtDay: dayjs(data.event.startsAt).format('YYYY-MM-DD'),
              startsAtTime: dayjs(data.event.startsAt).format('HH:mm'),
            }}
            onUpdateEvent={handleUpdateEvent}
            isLoading={isUpdating}
          />
        </EventDetailUpdate>
      )}
    </PrivateLayout>
  )
}
