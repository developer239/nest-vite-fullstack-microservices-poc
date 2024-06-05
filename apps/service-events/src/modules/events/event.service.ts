import { Injectable } from '@nestjs/common'
import { EventRepository } from 'src/modules/events/entities/event.repository'

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async findAll() {
    const events = await this.eventRepository.findAll()

    return events.map((event) => ({
      id: event.id,
      name: event.name,
      description: event.description,
      attendees: event.attendees.map((attendee) => attendee.userId),
    }))
  }
}
