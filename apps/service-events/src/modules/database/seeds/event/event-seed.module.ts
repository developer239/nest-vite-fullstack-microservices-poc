import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventSeedService } from 'src/modules/database/seeds/event/event-seed.service'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, EventAttendeeEntity])],
  providers: [EventSeedService],
  exports: [EventSeedService],
})
export class EventSeedModule {}
