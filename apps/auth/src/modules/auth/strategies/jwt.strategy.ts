import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { authConfig, AuthConfigType } from '@app/auth/config/auth.config'
import { AuthService } from '@app/auth/modules/auth/auth.service'
import { IJwtPayload } from '@app/auth/modules/auth/strategies/jwt.strategy.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfigValues: AuthConfigType
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfigValues.secret,
    })
  }

  public async validate(payload: IJwtPayload) {
    const user = await this.authService.validateUserById(payload.id)
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: `unauthorized`,
        },
        HttpStatus.UNAUTHORIZED
      )
    }

    return user
  }
}
