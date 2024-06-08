import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ISeedService } from 'backend-shared'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/modules/users/entities/user.entity'

@Injectable()
export class UserSeedService implements ISeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  public async run() {
    await this.createUser({
      id: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1b3b0b1b3b',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'joane@doe.com',
      uid: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1bfirebase',
    })
    await this.createUser({
      id: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1b3b0b1ffc',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      uid: '3b03b3b0-0b1b-4b3b-8b3b-0b1bfirebase',
    })
    await this.createUser({
      id: 'f7b3b3b0-0b1b-4b3b-8b3b-333b3b0b1fdd',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@smith',
      uid: 'b3b3b3b0-0b1b-4b3b-8b3b-0b1bfirebase',
    })
  }

  private async createUser(data: Partial<UserEntity>) {
    await this.repository.save(this.repository.create(data))

    Logger.log(`Created user: ${JSON.stringify(data)}`)
  }
}
