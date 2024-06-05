import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RabbitMQModule } from 'src/modules/amqb/amqb.module'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'
import { EventAttendeeRepository } from 'src/modules/events/entities/event-attendee.repository'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EventRepository } from 'src/modules/events/entities/event.repository'
import { EventOwnerEntity } from 'src/modules/events/entities/owner.entity'
import { EventResolver } from 'src/modules/events/event.resolver'
import { AMQPClientService } from 'src/modules/events/services/amqp-client'
import { EntityModelMapService } from 'src/modules/events/services/entity-model-map.service'
import { EventService } from 'src/modules/events/services/event.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      EventAttendeeEntity,
      EventOwnerEntity,
    ]),
    RabbitMQModule.forRoot(),
  ],
  providers: [
    EventResolver,
    EventService,
    EventRepository,
    EventAttendeeRepository,
    AMQPClientService,
    EntityModelMapService,
  ],
})
export class EventModule {}
