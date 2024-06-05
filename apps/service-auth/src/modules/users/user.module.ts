import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RabbitMQModule } from 'src/modules/amqb/amqb.module'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { UserRepository } from 'src/modules/users/entities/user.repository'
import { UserResolver } from 'src/modules/users/user.resolver'
import { UserService } from 'src/modules/users/user.service'
import { UserController } from 'src/modules/users/users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), RabbitMQModule],
  controllers: [UserController],
  providers: [UserService, UserResolver, UserRepository],
})
export class UserModule {}
