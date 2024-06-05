import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { UserService } from 'src/modules/users/user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: move cmd name and response to packages
  @MessagePattern({ cmd: 'check_user_exists' })
  async checkUserExists(data: {
    userId: number
  }): Promise<{ exists: boolean }> {
    const exists = await this.userService.checkUserExists(data.userId)
    return { exists }
  }
}
