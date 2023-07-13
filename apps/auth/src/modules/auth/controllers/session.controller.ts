import {
  Body,
  Controller,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from '@app/auth/modules/auth/auth.service'
import {
  EmailLoginRequestDTO,
  EmailLoginResponseDTO,
} from '@app/auth/modules/auth/dto/email-login.dto'
import {
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from '@app/auth/modules/auth/dto/refresh-token.dto'
import { User } from '@app/auth/modules/auth/entities/user.entity'
import { GetUserPayload } from '@app/auth/modules/auth/strategies/user.decorator'
import { IpAddress } from '@shared/common/utils/decorators/ip-address.decorator'

@ApiTags('Session')
@Controller({
  path: 'session',
  version: '1',
})
export class SessionController {
  constructor(public service: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email')
  @ApiOkResponse({
    type: EmailLoginResponseDTO,
  })
  public login(
    @Body() loginDto: EmailLoginRequestDTO,
    @GetUserPayload() user: User,
    @IpAddress() ipAddress: string
  ) {
    return this.service.login(user, ipAddress)
  }

  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('refresh')
  @ApiOkResponse({
    type: RefreshTokenResponseDTO,
  })
  public refreshToken(
    @Body() refreshTokenDto: RefreshTokenRequestDTO,
    @GetUserPayload() user: User
  ): { accessToken: string } {
    return this.service.refreshAccessToken(user)
  }
}
