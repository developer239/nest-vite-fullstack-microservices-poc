import clsx from 'clsx'
import { Card } from '../Card'
import { EventsList } from '../EventsList'
import { EventDTO, UserDTO } from '../../types.ts'

export type UserProfileProps = {
  user: UserDTO
  events: EventDTO[]
  isLoading: boolean
  className?: string
  onUpdate: (event: EventDTO) => void
  error?: any
  authenticatedUserId?: string
}

export const UserProfile = ({
  user,
  events,
  isLoading,
  className,
  error,
  onUpdate,
  authenticatedUserId,
}: UserProfileProps) => {
  if (isLoading || !user || error) {
    return null
  }

  return (
    <>
      <Card className={clsx('relative mt-[6rem]', className)}>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 flex items-center justify-center w-[12rem] h-[12rem] text-regent-gray font-medium text-4xl leading-4xl text-center bg-mischka rounded-full uppercase">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <div className="flex flex-col justify-center items-center pt-[8.3rem] pb-[4.4rem]">
          <span className="block text-limed-spruce text-lg font-primary leading-lg">
            {user.firstName} {user.lastName}
          </span>
          <span className="block mt-[0.8rem] text-regent-gray text-sm font-primary leading-sm">
            {user.email}
          </span>
        </div>
      </Card>
      {events && (
        <EventsList
          isProfile={true}
          isLoading={isLoading}
          data={events}
          onUpdate={onUpdate}
          authenticatedUserId={authenticatedUserId}
        />
      )}
    </>
  )
}
