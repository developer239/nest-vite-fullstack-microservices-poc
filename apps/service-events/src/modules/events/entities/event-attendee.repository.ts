import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EventAttendeeEntity } from 'src/modules/events/entities/attendee.entity'

@Injectable()
export class EventAttendeeRepository {
  constructor(
    @InjectRepository(EventAttendeeEntity)
    private readonly eventAttendeeRepository: Repository<EventAttendeeEntity>
  ) {}

  async joinEvent(eventId: string, userId: string) {
    const attendee = this.eventAttendeeRepository.create({
      userId,
      event: { id: eventId },
    })
    await this.eventAttendeeRepository.save(attendee)
    return attendee
  }

  findAttendee(eventId: string, userId: string) {
    return this.eventAttendeeRepository.findOne({
      where: { event: { id: eventId }, userId },
    })
  }

  remove(attendee: EventAttendeeEntity) {
    return this.eventAttendeeRepository.remove(attendee)
  }
}
