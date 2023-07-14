import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { AttendeeEntity } from '@app/events/modules/events/entities/attendee.entity'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

@Entity('event')
export class EventEntity extends EntityHelper {
  @PrimaryGeneratedColumn() id: number

  @Column()
  ownerUserId: number

  @ManyToMany(() => AttendeeEntity, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  attendees: AttendeeEntity[]

  @Column() title: string

  @Column() description: string

  @Column() capacity: number

  @Column() startsAt: Date

  @Exclude({ toPlainOnly: true }) @CreateDateColumn() createdAt: Date

  @Exclude({ toPlainOnly: true }) @UpdateDateColumn() updatedAt: Date

  @Exclude({ toPlainOnly: true }) @DeleteDateColumn() deletedAt: Date
}
