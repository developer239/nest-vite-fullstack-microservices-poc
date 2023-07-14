import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@app/auth/modules/auth/auth.service'
import { MeDTO } from '@app/auth/modules/auth/dto/me.dto'
import { RegisterRequestDTO } from '@app/auth/modules/auth/dto/register.dto'
import { User } from '@app/auth/modules/auth/entities/user.entity'
import { GetUserPayload } from '@app/auth/modules/auth/strategies/user.decorator'
import { IUser } from '@shared/common/interfaces'

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(public service: AuthService) {}

  @Post() @HttpCode(HttpStatus.CREATED) register(
    @Body() createUserDto: RegisterRequestDTO
  ) {
    return this.service.register(createUserDto)
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: MeDTO,
  })
  public me(@GetUserPayload() user: User) {
    return user
  }

  @MessagePattern('AUTH_USERS_LIST')
  listUsers(@Payload() data: { payload: number[] }): Promise<IUser[]> {
    const userIds = data.payload
    return this.service.listUsers(userIds)
  }
}
