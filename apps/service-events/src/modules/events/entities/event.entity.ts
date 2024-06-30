import { EntityHelper } from 'nest-helpers'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'
import { EventOwnerEntity } from 'src/modules/events/entities/owner.entity'

@Entity('event')
export class EventEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column() title: string

  @Column() description: string

  @Column() capacity: number

  @Column() startsAt: Date

  @Index()
  @ManyToOne(() => EventOwnerEntity, (owner) => owner.events, {
    eager: true,
    cascade: true,
  })
  owner: EventOwnerEntity

  @OneToMany(() => EventAttendeeEntity, (attendee) => attendee.event, {
    eager: true,
    cascade: true,
  })
  attendees: EventAttendeeEntity[]
}
