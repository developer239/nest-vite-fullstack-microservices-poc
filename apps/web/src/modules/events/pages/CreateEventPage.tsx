import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { HeaderActionButton } from 'ui-library'
import { useCreateEventMutation } from 'src/graphql-generated'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'
import {
  CreateEventForm,
  CreateEventFormData,
} from 'src/modules/events/forms/CreateEventForm'

export const CreateEventPage = () => {
  const [createEvent, { loading: isLoading }] = useCreateEventMutation()
  const navigate = useNavigate()

  const handleCreateEvent = async ({
    startsAtDay,
    startsAtTime,
    ...values
  }: CreateEventFormData) => {
    const startsAt = dayjs(`${startsAtDay} ${startsAtTime}`).toISOString()

    const result = await createEvent({
      variables: {
        input: {
          ...values,
          startsAt,
        },
      },
    })
    navigate(`/events/${result.data?.createEvent.id}`)
  }

  return (
    <PrivateLayout
      headerRight={
        <HeaderActionButton href="/" actionType="close">
          Close
        </HeaderActionButton>
      }
    >
      <CreateEventForm isLoading={isLoading} onSubmit={handleCreateEvent} />
    </PrivateLayout>
  )
}
