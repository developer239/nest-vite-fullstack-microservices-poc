import { EntityHelper } from 'nest-helpers'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'

@Entity('event_attendee')
export class EventAttendeeEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid') id: string

  @Index()
  @Column('uuid')
  userId: string

  @Index()
  @ManyToOne(() => EventEntity, (event) => event.attendees, {
    onDelete: 'CASCADE',
  })
  event: EventEntity
}
