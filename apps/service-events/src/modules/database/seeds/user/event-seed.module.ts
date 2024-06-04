import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventSeedService } from 'src/modules/database/seeds/user/event-seed.service'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { EventAttendeeEntity } from 'src/modules/events/entities/event-attendee.entity'
import { AttendeeEntity } from 'src/modules/events/entities/attendee.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      EventAttendeeEntity,
      AttendeeEntity,
    ]),
  ],
  providers: [EventSeedService],
  exports: [EventSeedService],
})
export class EventSeedModule {}
