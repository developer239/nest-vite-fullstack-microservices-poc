import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

@Entity('payment')
export class PaymentEntity extends EntityHelper {
  @PrimaryGeneratedColumn() paymentId: number

  @Column() entityId: number

  @Column() entityType: string

  @Column() userId: number

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number

  @Column() stripeId: string

  @Column({
    type: 'enum',
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  })
  transactionStatus: string

  @Exclude({ toPlainOnly: true }) @CreateDateColumn() createdAt: Date

  @Exclude({ toPlainOnly: true }) @UpdateDateColumn() updatedAt: Date

  @Exclude({ toPlainOnly: true }) @DeleteDateColumn() deletedAt: Date
}
