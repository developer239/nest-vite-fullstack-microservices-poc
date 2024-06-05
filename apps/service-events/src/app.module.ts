import { Module } from '@nestjs/common'
import { DatabaseModule, HomeModule, GraphQLModule } from 'backend-shared'
import { ConfigModule } from 'src/modules/config/config.module'
import { EventModule } from 'src/modules/events/events.module'

@Module({
  imports: [
    ConfigModule,
    HomeModule,
    DatabaseModule.forRootAsync(),
    GraphQLModule.forRoot(),
    EventModule,
  ],
})
export class AppModule {}
