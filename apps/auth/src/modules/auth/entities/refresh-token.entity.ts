import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from '@app/auth/modules/auth/entities/user.entity'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

@Entity('refresh_token')
export class RefreshTokenEntity extends EntityHelper {
  @PrimaryGeneratedColumn() id: number

  @ManyToOne(() => UserEntity, (user) => user.refreshTokens, { eager: true })
  user: UserEntity

  @Index() @Column() value: string

  @Column({
    nullable: true,
  })
  ipAddress: string

  @CreateDateColumn() createdAt: Date

  @UpdateDateColumn() updatedAt: Date
}
