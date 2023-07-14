import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, FindOptionsWhere, In, Repository } from 'typeorm'
import { RegisterRequestDTO } from '@app/auth/modules/auth/dto/register.dto'
import { User } from '@app/auth/modules/auth/entities/user.entity'

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  list(userIds: number[]) {
    return this.usersRepository.findBy({
      id: In(userIds),
    })
  }

  create(createProfileDto: RegisterRequestDTO) {
    return this.usersRepository.save(
      this.usersRepository.create({
        ...createProfileDto,
      })
    )
  }

  findOne(fields: FindOptionsWhere<User>, relations?: string[]) {
    return this.usersRepository.findOne({
      where: fields,
      relations,
    })
  }

  findManyWithPagination(paginationOptions: { offset: number; limit: number }) {
    return this.usersRepository.find({
      skip: paginationOptions.offset,
      take: paginationOptions.limit,
    })
  }

  async update(id: number, payload: DeepPartial<User>) {
    const userToUpdate = await this.usersRepository.preload({
      id,
      ...payload,
    })

    if (!userToUpdate) {
      return undefined
    }

    await this.usersRepository.save(userToUpdate)

    return userToUpdate
  }

  async softDelete(id: number) {
    const result = await this.usersRepository.softDelete(id)

    return Boolean(result.affected)
  }
}
