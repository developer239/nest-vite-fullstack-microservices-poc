import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { EntityHelper } from 'backend-shared'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'

@Entity('event')
export class EventEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => EventAttendeeEntity, (attendee) => attendee.event, {
    eager: true,
    cascade: true,
  })
  attendees: EventAttendeeEntity[]

  @Column()
  title: string

  @Column()
  description: string
}
