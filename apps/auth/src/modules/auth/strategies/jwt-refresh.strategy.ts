import { Injectable, Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { authConfig, AuthConfigType } from '@app/auth/config/auth.config'
import { RefreshTokenRepository } from '@app/auth/modules/auth/entities/refresh-token-repository'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(authConfig.KEY)
    private readonly authConfigValues: AuthConfigType
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: authConfigValues.secret,
      passReqToCallback: true,
    })
  }

  public async validate(request: { body: { refreshToken: string } }) {
    const refreshTokenValue = request.body.refreshToken

    const refreshToken =
      await this.refreshTokenRepository.findRefreshTokenByValue(
        refreshTokenValue
      )

    if (!refreshToken) {
      return false
    }

    return refreshToken?.user
  }
}
