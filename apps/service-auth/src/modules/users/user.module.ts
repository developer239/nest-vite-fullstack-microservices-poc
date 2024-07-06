import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FirebaseModule } from 'nest-helpers'
// import { RabbitMQModule } from 'src/modules/amqb/amqb.module'
import { UserEntity } from 'src/modules/users/entities/user.entity'
import { UserRepository } from 'src/modules/users/entities/user.repository'
import { AmqpSyncUserClientService } from 'src/modules/users/services/amqp-sync-user-client.service'
import { UserService } from 'src/modules/users/services/user.service'
import { UserResolver } from 'src/modules/users/user.resolver'
// import { UserController } from 'src/modules/users/users.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // RabbitMQModule,
    FirebaseModule.forRoot({
      userVerificationService: AmqpSyncUserClientService,
      imports: [TypeOrmModule.forFeature([UserEntity])],
      inject: [UserRepository, UserService],
    }),
  ],
  // controllers: [UserController],
  providers: [UserService, UserResolver, UserRepository],
  exports: [UserService],
})
export class UserModule {}
