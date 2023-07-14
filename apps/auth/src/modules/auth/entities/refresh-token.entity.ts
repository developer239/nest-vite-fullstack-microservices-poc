import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@app/auth/modules/auth/entities/user.entity'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

@Entity()
export class RefreshToken extends EntityHelper {
  @PrimaryGeneratedColumn() id: number

  @ManyToOne(() => User, (user) => user.refreshTokens, { eager: true })
  user: User

  @Index() @Column() value: string

  @Column({
    nullable: true,
  })
  ipAddress: string

  @CreateDateColumn() createdAt: Date

  @UpdateDateColumn() updatedAt: Date
}
