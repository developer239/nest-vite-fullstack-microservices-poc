import { Injectable } from '@nestjs/common'
import { IUserVerificationService, UserRole } from 'nest-helpers'
import { UserService } from 'src/modules/users/services/user.service'

@Injectable()
export class AmqpSyncUserClientService implements IUserVerificationService {
  constructor(private readonly userService: UserService) {}

  async syncUser<
    TUser extends { id: string; email: string; role: UserRole },
  >(data: { uid: string; email: string }): Promise<TUser> {
    let user = await this.userService.validateUserByFirebasePayload(data)

    if (!user) {
      user = await this.userService.createUserFromFirebasePayload(
        data.email,
        data.uid
      )
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    } as TUser // TODO: remove type cast
  }
}
