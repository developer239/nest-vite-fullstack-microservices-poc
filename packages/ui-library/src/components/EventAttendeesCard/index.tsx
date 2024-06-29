import clsx from 'clsx'
import { Card } from '../Card'
import { UserDTO } from '../../types.ts'

export type EventAttendeesProps = {
  attendees: UserDTO[]
  className?: string
}

export const EventAttendeesCard = ({
  className,
  attendees,
}: EventAttendeesProps) => (
  <Card className={clsx('flex flex-col py-[2.6rem] px-[3.2rem]', className)}>
    <span className="text-limed-spruce font-normal text-xl font-primary">
      Attendees
    </span>
    <ul className="flex flex-wrap mt-[1.9rem]">
      {attendees.map((attendee) => (
        <li
          key={attendee.id}
          className="flex items-center justify-center m-[0.4rem] py-[1rem] px-[1.6rem] text-regent-gray text-ssm font-primary bg-mischka rounded-2xl"
        >
          {attendee.firstName} {attendee.lastName}
        </li>
      ))}
    </ul>
  </Card>
)
