import { EntityHelper, UserRole } from 'backend-shared'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column() firstName: string

  @Column() lastName: string

  @Index()
  @Column({ unique: true })
  email: string

  @Index()
  @Column({ unique: true })
  uid: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole
}
