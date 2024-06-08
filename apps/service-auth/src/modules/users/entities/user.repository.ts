import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRole } from 'backend-shared'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { RegisterInput } from 'src/modules/users/inputs/register.input'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  findAll() {
    return this.usersRepository.find()
  }

  findOneById(id: string) {
    return this.usersRepository.findOneBy({ id })
  }

  async checkUserExists(userId: string): Promise<boolean> {
    try {
      await this.usersRepository.findOneByOrFail({ id: userId })
      return true
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        return false
      }
      throw new InternalServerErrorException('Database error')
    }
  }

  validateUserByFirebasePayload(decodedIdToken: {
    uid: string
    email: string
  }) {
    return this.usersRepository.findOneBy({
      email: decodedIdToken.email,
      uid: decodedIdToken.uid,
    })
  }

  createUserFromFirebasePayload(email: string, uid: string) {
    return this.usersRepository.save(
      this.usersRepository.create({
        email,
        uid,
      })
    )
  }

  createUser(uid: string, data: RegisterInput) {
    return this.usersRepository.save(
      this.usersRepository.create({
        uid,
        ...data,
        role: UserRole.USER,
      })
    )
  }
}
