import { Module } from '@nestjs/common'
import { DatabaseModule, HomeModule, GraphQLModule } from 'nest-helpers'
import { ConfigModule } from 'src/modules/config/config.module'
import { UserModule } from 'src/modules/users/user.module'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRootAsync(),
    HomeModule,
    GraphQLModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
