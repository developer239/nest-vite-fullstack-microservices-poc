import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import {
  AUTH_SYNC_USER_CMD,
  CHECK_USER_EXISTS_CMD,
  ISyncUserAuthorizedInput,
  ISyncUserResult,
  ICheckUserExistsInput,
  ICheckUserExistsResult,
} from 'amqp-contracts'
import { UserService } from 'src/modules/users/services/user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: CHECK_USER_EXISTS_CMD })
  async checkUserExists(
    data: ICheckUserExistsInput
  ): Promise<ICheckUserExistsResult> {
    return { exists: await this.userService.checkUserExists(data.userId) }
  }

  @MessagePattern({ cmd: AUTH_SYNC_USER_CMD })
  async syncUser(data: ISyncUserAuthorizedInput): Promise<ISyncUserResult> {
    let user = await this.userService.validateUserByFirebasePayload(
      data.decodedIdToken
    )

    if (!user) {
      user = await this.userService.createUserFromFirebasePayload(
        data.decodedIdToken.email,
        data.decodedIdToken.uid
      )
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  }
}
