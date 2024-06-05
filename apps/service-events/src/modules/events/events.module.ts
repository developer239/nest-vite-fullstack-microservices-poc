import { Module } from '@nestjs/common'
import { EventService } from 'src/modules/events/event.service'
import { EventResolver } from 'src/modules/events/event.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'
import { EventRepository } from 'src/modules/events/entities/event.repository'

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, EventAttendeeEntity])],
  providers: [EventService, EventResolver, EventRepository],
})
export class EventModule {}
