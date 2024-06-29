import clsx from 'clsx'
import DeleteIcon from '../Icons/DeleteIcon.tsx'
import { IEventUI } from '../../types.ts'

export type EventDetailControlsProps = {
  className?: string
  isDeletable: boolean
  event: IEventUI
  onDelete?: (event: IEventUI) => void
  isLoading: boolean
}

export const EventDetailControls = ({
  className,
  isDeletable,
  event,
  onDelete,
  isLoading,
}: EventDetailControlsProps) => (
  <div className={clsx('flex justify-between', className)}>
    <span className="items-center text-gray-chateau font-bold text-sm leading-1xl tracking-wide uppercase">
      Detail event: #{event.id}
    </span>
    {isDeletable && (
      <button
        onClick={() => {
          if (onDelete) {
            onDelete(event)
          }
        }}
        className={clsx('flex bg-transparent items-center', {
          'cursor-not-allowed': isLoading,
          'cursor-pointer': !isLoading,
        })}
        disabled={isLoading}
      >
        <DeleteIcon className="w-[1.6rem] h-[1.6rem] fill-wild-strawberry mr-[1.2rem]" />
        <span className="hidden md:block text-wild-strawberry font-bold h-[1rem] text-xs font-primary leading-xs tracking-wider uppercase">
          {isLoading ? 'Deleting...' : 'Delete'}
        </span>
      </button>
    )}
  </div>
)
