import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EntityHelper } from 'backend-shared'

@Entity('event-attendee')
export class EventAttendeeEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @ManyToOne(() => EventEntity, (event) => event.attendees)
  event: EventEntity
}
