import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { EntityHelper } from 'backend-shared'
import { EventAttendeeEntity } from 'src/modules/events/entities/event-attendee.entity'

@Entity('attendee')
export class AttendeeEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  userId: number

  @OneToMany(
    () => EventAttendeeEntity,
    (eventAttendee) => eventAttendee.attendee,
    {
      eager: true,
      cascade: true,
    }
  )
  eventAttendees: EventAttendeeEntity[]
}
