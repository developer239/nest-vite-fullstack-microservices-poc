import { Injectable, NotFoundException } from '@nestjs/common'
import { EventAttendeeRepository } from 'src/modules/events/entities/event-attendee.repository'
import { EventRepository } from 'src/modules/events/entities/event.repository'
import { AMQPClientService } from 'src/modules/events/services/amqp-client'

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventAttendeeRepository: EventAttendeeRepository,
    private readonly amqpClientService: AMQPClientService
  ) {}

  async findOne(id: number) {
    const event = await this.eventRepository.findOneById(id)

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`)
    }

    return event
  }

  findAll() {
    return this.eventRepository.findAll()
  }

  async joinEvent(eventId: number, userId: number) {
    const isUserExists = await this.amqpClientService.checkUserExists(userId)

    if (!isUserExists) {
      throw new NotFoundException(`User with id ${userId} does not exist`)
    }

    await this.eventAttendeeRepository.joinEvent(eventId, userId)
  }
}
