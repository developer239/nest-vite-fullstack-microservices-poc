import * as bcrypt from 'bcrypt'
import { Exclude, Expose } from 'class-transformer'
import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm'
import { RefreshTokenEntity } from '@app/auth/modules/auth/entities/refresh-token.entity'
import { EntityHelper } from '@shared/common/utils/database/entity-helper'

@Entity('user')
export class UserEntity extends EntityHelper {
  @PrimaryGeneratedColumn() id: number

  @Expose({ groups: ['me', 'admin'] })
  @Column({ unique: true, nullable: true })
  email: string

  @Column() firstName: string

  @Column() lastName: string

  @Exclude({ toPlainOnly: true }) @Column({ nullable: true }) password: string

  @Exclude({ toPlainOnly: true }) public previousPassword: string

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt()
      this.password = await bcrypt.hash(this.password, salt)
    }
  }

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshTokenEntity[]

  @Exclude({ toPlainOnly: true }) @CreateDateColumn() createdAt: Date

  @Exclude({ toPlainOnly: true }) @UpdateDateColumn() updatedAt: Date

  @Exclude({ toPlainOnly: true }) @DeleteDateColumn() deletedAt: Date
}
