import clsx from 'clsx'
import { Card } from '../Card'
import { EventsList } from '../EventsList'

// TODO: add types
export type EventDTO = any

export type MeDTO = {
  firstName: string
  lastName: string
  email: string
  events?: EventDTO[]
}

export type UserProfileProps = {
  data: MeDTO
  isLoading: boolean
  className?: string
  onUpdate: (event: EventDTO) => void
  error?: any
  authenticatedUserId?: number
}

export const UserProfile = ({
  data,
  isLoading,
  className,
  error,
  onUpdate,
  authenticatedUserId,
}: UserProfileProps) => {
  if (isLoading || !data || error) {
    return null
  }

  return (
    <>
      <Card className={clsx('relative mt-[6rem]', className)}>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 flex items-center justify-center w-[12rem] h-[12rem] text-regent-gray font-medium text-4xl leading-4xl text-center bg-mischka rounded-full uppercase">
          {data.firstName[0]}
          {data.lastName[0]}
        </div>
        <div className="flex flex-col justify-center items-center pt-[8.3rem] pb-[4.4rem]">
          <span className="block text-limed-spruce text-lg font-primary leading-lg">
            {data.firstName} {data.lastName}
          </span>
          <span className="block mt-[0.8rem] text-regent-gray text-sm font-primary leading-sm">
            {data.email}
          </span>
        </div>
      </Card>
      {data.events && (
        <EventsList
          isProfile={true}
          isLoading={isLoading}
          data={data.events}
          onUpdate={onUpdate}
          authenticatedUserId={authenticatedUserId}
        />
      )}
    </>
  )
}
