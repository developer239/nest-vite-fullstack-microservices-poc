import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import {
  CHECK_USER_EXISTS_CMD,
  ICheckUserExistsInput,
  ICheckUserExistsResult,
} from 'backend-contracts'
import { UserService } from 'src/modules/users/user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: CHECK_USER_EXISTS_CMD })
  async checkUserExists(
    data: ICheckUserExistsInput
  ): Promise<ICheckUserExistsResult> {
    return { exists: await this.userService.checkUserExists(data.userId) }
  }
}
