import { Module } from '@nestjs/common'
import { DatabaseModule, HomeModule, GraphQLModule } from 'nest-helpers'
import { ConfigModule } from 'src/modules/config/config.module'
import { EventModule } from 'src/modules/events/events.module'

@Module({
  imports: [
    ConfigModule,
    HomeModule,
    DatabaseModule.forRootAsync(),
    // TODO: pass orphans to the module
    GraphQLModule.forRoot(),
    EventModule,
  ],
})
export class AppModule {}
