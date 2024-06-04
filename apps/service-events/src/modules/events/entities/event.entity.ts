import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { EntityHelper } from 'backend-shared'
import { EventAttendeeEntity } from 'src/modules/events/entities/event-attendee.entity'

@Entity('event')
export class EventEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  ownerUserId: number

  @OneToMany(
    () => EventAttendeeEntity,
    (eventAttendee) => eventAttendee.event,
    {
      eager: true,
      cascade: true,
    }
  )
  eventAttendees: EventAttendeeEntity[]

  @Column()
  title: string

  @Column()
  description: string
}
