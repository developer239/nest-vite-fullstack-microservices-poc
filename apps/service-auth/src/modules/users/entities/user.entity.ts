import { EntityHelper, UserRole } from 'nest-helpers'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column({
    nullable: true,
  })
  firstName: string

  @Column({
    nullable: true,
  })
  lastName: string

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
