import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { map, Observable, tap } from 'rxjs'
import { IAuthServiceJwtStrategyPayload } from '@shared/common/modules/auth/strategies/auth-service-jwt.strategy.types'
import { AUTH_MICRO_SERVICE_TOKEN } from '@shared/common/modules/auth/tokens'

@Injectable()
export class AuthServiceJwtStrategy implements CanActivate {
  constructor(
    @Inject(AUTH_MICRO_SERVICE_TOKEN) private readonly authClient: ClientProxy
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication
    if (!jwt) {
      return false
    }

    return this.authClient
      .send<IAuthServiceJwtStrategyPayload>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((user) => {
          context.switchToHttp().getRequest().user = user
        }),
        map(() => true)
      )
  }
}
