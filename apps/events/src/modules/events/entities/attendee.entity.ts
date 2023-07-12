import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

@Entity()
export class Attendee extends EntityHelper {
  @PrimaryGeneratedColumn() id: number

  @Column({ unique: true })
  userId: number
}
