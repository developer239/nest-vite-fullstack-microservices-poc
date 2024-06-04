import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ISeedService } from 'backend-shared'
import { UserEntity } from 'src/modules/users/entities/user.entity'

@Injectable()
export class UserSeedService implements ISeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  public async run() {
    await this.createUser({
      email: 'joane@doe.com',
      name: 'Joane Doe',
    })
    await this.createUser({
      email: 'john@doe.com',
      name: 'John Doe',
    })
  }

  private async createUser(data: any) {
    await this.repository.save(this.repository.create(data))

    Logger.log(`Created user: ${JSON.stringify(data)}`)
  }
}
