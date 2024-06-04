import { Module } from '@nestjs/common'
import { UserService } from 'src/modules/users/user.service'
import { UserResolver } from 'src/modules/users/user.resolver'

@Module({
  imports: [],
  providers: [UserService, UserResolver],
})
export class UserModule {}