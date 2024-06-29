import { EventsFilter } from '../EventsFilter'
import { EventGridCard } from '../EventGridCard'
import { EventListCard } from '../EventListCard'
import { useStateWithLocalStorage } from '../../utils/useLocalStorageState.ts'
import { EventDTO } from '../../types.ts'

export type EventsListProps = {
  data: EventDTO[]
  isLoading: boolean
  isProfile?: boolean
  onUpdate: (event: EventDTO) => void
  authenticatedUserId?: string
}

export const EventsList = ({
  data,
  isLoading,
  isProfile,
  onUpdate,
  authenticatedUserId,
}: EventsListProps) => {
  const [filterType, setFilterType] = useStateWithLocalStorage<
    'all' | 'future' | 'past'
  >('ui-filter-type', 'all')
  const [viewType, setViewType] = useStateWithLocalStorage<'grid' | 'list'>(
    'ui-view-type',
    'grid'
  )

  const filter = (events: EventDTO[]) => {
    if (isProfile) {
      return events
    }

    switch (filterType) {
      case 'all':
        return events
      case 'future':
        return events.filter((event) => {
          const startsAt = new Date(event.startsAt)
          const now = new Date()
          return startsAt > now
        })
      case 'past':
        return events.filter((event) => {
          const startsAt = new Date(event.startsAt)
          const now = new Date()
          return startsAt < now
        })
      default:
        return []
    }
  }

  if (isLoading || !data) {
    return null
  }

  if (viewType === 'grid') {
    return (
      <>
        <EventsFilter
          changeFilterType={setFilterType}
          changeViewType={setViewType}
          viewType={viewType}
          filterType={filterType}
          isProfile={isProfile}
          className="mt-[3rem] mb-[3rem] md:mb-[4rem]"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
          {filter(data).map((event) => (
            <EventGridCard
              key={event.id}
              onUpdate={onUpdate}
              event={event}
              authenticatedUserId={authenticatedUserId}
            />
          ))}
        </div>
      </>
    )
  }

  if (viewType === 'list') {
    return (
      <>
        <EventsFilter
          changeFilterType={setFilterType}
          changeViewType={setViewType}
          viewType={viewType}
          filterType={filterType}
          isProfile={isProfile}
          className="mt-[3rem] mb-[3rem] md:mb-[4rem]"
        />
        <div className="flex flex-col gap-[1.6rem]">
          {filter(data).map((event) => (
            <EventListCard
              key={event.id}
              onUpdate={onUpdate}
              event={event}
              authenticatedUserId={authenticatedUserId}
            />
          ))}
        </div>
      </>
    )
  }

  return null
}
