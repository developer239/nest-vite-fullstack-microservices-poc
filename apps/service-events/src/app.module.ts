import { Module } from '@nestjs/common'
import { HomeModule, WrappedGraphQLModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { EventModule } from 'src/modules/events/events.module'

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
    WrappedGraphQLModule.forRoot(),
    EventModule,
  ],
})
export class AppModule {}
