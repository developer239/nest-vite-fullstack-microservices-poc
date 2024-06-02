import { Module } from '@nestjs/common'
import { EventService } from 'src/modules/events/event.service'
import { EventResolver } from 'src/modules/events/event.resolver'

@Module({
  providers: [EventService, EventResolver],
})
export class EventModule {}
