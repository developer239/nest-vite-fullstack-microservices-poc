import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/modules/users/entities/user.entity'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  findAll() {
    return this.usersRepository.find()
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id })
  }

  async checkUserExists(userId: number): Promise<boolean> {
    try {
      await this.usersRepository.findOneByOrFail({ id: userId })
      return true
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        return false
      } else {
        throw new InternalServerErrorException('Database error')
      }
    }
  }
}
