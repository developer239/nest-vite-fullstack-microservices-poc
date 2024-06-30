import { EntityHelper } from 'nest-helpers'
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'

@Entity('event_owner')
export class EventOwnerEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid') id: string

  @Index()
  @Column('uuid')
  userId: string

  @OneToMany(() => EventEntity, (event) => event.owner)
  events: EventEntity[]
}
