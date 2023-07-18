import { Exclude } from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

export enum PaymentStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
}

@Entity('payment')
@Unique(['entityId', 'entityType', 'userId'])
export class PaymentEntity extends EntityHelper {
  @PrimaryGeneratedColumn() paymentId: number

  @Column() entityId: number

  @Column() entityType: string

  @Column() userId: number

  @Column({ comment: 'Amount in cents' })
  amount: number

  @Column() stripeId: string

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus

  @Column({ default: false }) isRefunded: boolean

  @Exclude({ toPlainOnly: true }) @CreateDateColumn() createdAt: Date

  @Exclude({ toPlainOnly: true }) @UpdateDateColumn() updatedAt: Date

  @Exclude({ toPlainOnly: true }) @DeleteDateColumn() deletedAt: Date
}
