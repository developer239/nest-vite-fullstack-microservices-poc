import { Injectable } from '@nestjs/common'
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

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id })
  }

  checkUserExists(userId: number) {
    try {
      return Boolean(this.usersRepository.findOneByOrFail({ id: userId }))
    } catch (error) {
      return false
    }
  }
}
