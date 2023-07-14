import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { authConfig, AuthConfigType } from '@app/auth/config/auth.config'
import { AuthService } from '@app/auth/modules/auth/auth.service'
import { SessionController } from '@app/auth/modules/auth/controllers/session.controller'
import { UsersController } from '@app/auth/modules/auth/controllers/users.controller'
import { RefreshTokenRepository } from '@app/auth/modules/auth/entities/refresh-token-repository'
import { RefreshTokenEntity } from '@app/auth/modules/auth/entities/refresh-token.entity'
import { UserEntity } from '@app/auth/modules/auth/entities/user.entity'
import { UsersRepository } from '@app/auth/modules/auth/entities/users.repository'
import { JwtRefreshTokenStrategy } from '@app/auth/modules/auth/strategies/jwt-refresh.strategy'
import { JwtStrategy } from '@app/auth/modules/auth/strategies/jwt.strategy'
import { LocalStrategy } from '@app/auth/modules/auth/strategies/local.strategy'
import { DoesNotExist } from '@shared/common/utils/validators/does-not-exist.validator'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [authConfig.KEY],
      useFactory: (config: AuthConfigType) => ({
        secret: config.secret,
        signOptions: {
          expiresIn: config.expires,
        },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
  ],
  controllers: [UsersController, SessionController],
  providers: [
    DoesNotExist,
    AuthService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    LocalStrategy,
    RefreshTokenRepository,
    UsersRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
