import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

@Entity('attendee')
export class AttendeeEntity extends EntityHelper {
  @PrimaryGeneratedColumn() id: number

  @Column({ unique: true })
  userId: number
}
