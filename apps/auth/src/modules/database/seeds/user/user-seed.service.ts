import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@app/auth/modules/auth/entities/user.entity'
import { ISeedService } from '@app/auth/modules/database/seeds/services/seed.types'

@Injectable()
export class UserSeedService implements ISeedService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  public async run() {
    await this.createUser({
      firstName: 'Joane',
      lastName: 'Doe',
      email: 'joane@doe.com',
      password: 'Lwo4321',
    })
    await this.createUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'Lwo4321',
    })
  }

  private async createUser(data: any) {
    await this.repository.save(this.repository.create(data))

    Logger.log(`Created user: ${JSON.stringify(data)}`)
  }
}
