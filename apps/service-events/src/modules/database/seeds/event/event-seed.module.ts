import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventSeedService } from 'src/modules/database/seeds/event/event-seed.service'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EventOwnerEntity } from 'src/modules/events/entities/owner.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      EventAttendeeEntity,
      EventOwnerEntity,
    ]),
  ],
  providers: [EventSeedService],
  exports: [EventSeedService],
})
export class EventSeedModule {}
