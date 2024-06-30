import { HeaderActionButton } from 'ui-library'
import { PrivateLayout } from 'src/modules/core/components/PrivateLayout'

export const CreateEventPage = () => (
  <PrivateLayout
    headerRight={
      <HeaderActionButton href="/" actionType="close">
        Close
      </HeaderActionButton>
    }
  >
    {/*<CreateEventForm />*/}
  </PrivateLayout>
)
