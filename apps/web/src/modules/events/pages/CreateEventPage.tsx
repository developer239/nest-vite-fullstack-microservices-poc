import { HeaderActionButton } from 'ui-library'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'
import { CreateEventForm } from 'src/modules/events/forms/CreateEventForm'

export const CreateEventPage = () => (
  <PrivateLayout
    headerRight={
      <HeaderActionButton href="/" actionType="close">
        Close
      </HeaderActionButton>
    }
  >
    <CreateEventForm
      isLoading={false}
      onSubmit={(__) => {
        throw new Error('Function not implemented.')
      }}
    />
  </PrivateLayout>
)
