import { Module } from '@nestjs/common'
import { UserService } from 'src/modules/users/user.service'
import { UserResolver } from 'src/modules/users/user.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { UserRepository } from 'src/modules/users/entities/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, UserRepository],
})
export class UserModule {}
