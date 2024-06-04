import { Module } from '@nestjs/common'
import {
  DatabaseModule,
  HomeModule,
  WrappedGraphQLModule,
} from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { UserModule } from 'src/modules/users/user.module'

@Module({
  imports: [
    WrappedConfigModule,
    DatabaseModule.forRootAsync(),
    HomeModule,
    WrappedGraphQLModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
