import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { AttendeeEntity } from 'src/modules/events/entities/attendee.entity'

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>,
    @InjectRepository(AttendeeEntity)
    private readonly attendeesRepository: Repository<AttendeeEntity>
  ) {}
}
