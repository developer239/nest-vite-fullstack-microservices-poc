import { Module } from '@nestjs/common'
import { EventService } from 'src/modules/events/event.service'
import { EventResolver } from 'src/modules/events/event.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'
import { EventRepository } from 'src/modules/events/entities/event.repository'
import { EventAttendeeRepository } from 'src/modules/events/entities/event-attendee.repository'
import { RabbitMQModule } from 'backend-shared'

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, EventAttendeeEntity]),
    RabbitMQModule.forRoot(9081),
  ],
  providers: [
    EventService,
    EventResolver,
    EventRepository,
    EventAttendeeRepository,
  ],
})
export class EventModule {}
