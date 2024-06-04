import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { AttendeeEntity } from 'src/modules/events/entities/attendee.entity'

@Entity('event_attendee')
@Unique(['event', 'attendee'])
export class EventAttendeeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => EventEntity, (event) => event.eventAttendees)
  event: EventEntity

  @ManyToOne(() => AttendeeEntity, (attendee) => attendee.eventAttendees)
  attendee: AttendeeEntity
}
