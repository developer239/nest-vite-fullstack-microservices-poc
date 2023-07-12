import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RefreshToken } from '@app/auth/modules/auth/entities/refresh-token.entity'
import { User } from '@app/auth/modules/auth/entities/user.entity'
import { UserSeedService } from '@app/auth/modules/database/seeds/user/user-seed.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
