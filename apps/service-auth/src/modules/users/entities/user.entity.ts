import { EntityHelper } from 'backend-shared'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity extends EntityHelper {
  @PrimaryGeneratedColumn() id: number

  @Column({ unique: true })
  email: string

  @Column() name: string
}
