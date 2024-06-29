import clsx from 'clsx'
import ListViewIcon from '../Icons/ListViewIcon.tsx'
import GridIcon from '../Icons/GridIcon.tsx'

export type EventsFilterProps = {
  isProfile?: boolean
  filterType: 'all' | 'future' | 'past'
  changeFilterType: (filterType: 'all' | 'future' | 'past') => void
  viewType: 'grid' | 'list'
  changeViewType: (viewType: 'grid' | 'list') => void
  className?: string
}

export const EventsFilter = ({
  isProfile,
  className,
  filterType,
  viewType,
  changeFilterType,
  changeViewType,
}: EventsFilterProps) => (
  <div className={clsx('flex justify-between', className)}>
    {isProfile && (
      <span className="text-black font-normal text-xl font-primary leading-xl uppercase">
        All Events
      </span>
    )}
    {!isProfile && (
      <>
        <label className="md:hidden flex items-center text-gray-chateau font-bold text-xs leading-1xl font-primary uppercase tracking-wide">
          Show:
          <select className="uppercase tracking-wide text-black ml-[1rem] bg-athens-gray">
            <option value="all">All Events</option>
            <option value="future">Future Events</option>
            <option value="past">Past Events</option>
          </select>
        </label>
        <div className="hidden md:flex gap-[3.2rem]">
          <button
            onClick={() => changeFilterType('all')}
            className={clsx(
              'font-bold text-sm font-primary leading-1xl tracking-wide uppercase',
              {
                'text-black': filterType === 'all',
                'text-gray-chateau': filterType !== 'all',
              }
            )}
          >
            All Events
          </button>
          <button
            onClick={() => changeFilterType('future')}
            className={clsx(
              'font-bold text-sm font-primary leading-1xl tracking-wide uppercase',
              {
                'text-black': filterType === 'future',
                'text-gray-chateau': filterType !== 'future',
              }
            )}
          >
            Future Events
          </button>
          <button
            onClick={() => changeFilterType('past')}
            className={clsx(
              'font-bold text-sm font-primary leading-1xl tracking-wide uppercase',
              {
                'text-black': filterType === 'past',
                'text-gray-chateau': filterType !== 'past',
              }
            )}
          >
            Past Events
          </button>
        </div>
      </>
    )}
    <div className="flex gap-[0.8rem] md:gap-[1.5rem]">
      <button name="show-list-view" onClick={() => changeViewType('list')}>
        <ListViewIcon
          className={clsx('w-[2.5rem] h-[2.5rem] fill-black', {
            'fill-mischka': viewType !== 'list',
            'fill-black': viewType !== 'list',
          })}
        />
      </button>
      <button name="show-grid-view" onClick={() => changeViewType('grid')}>
        <GridIcon
          className={clsx('w-[2.5rem] h-[2.5rem] fill-black', {
            'fill-mischka': viewType !== 'grid',
            'fill-black': viewType !== 'grid',
          })}
        />
      </button>
    </div>
  </div>
)
