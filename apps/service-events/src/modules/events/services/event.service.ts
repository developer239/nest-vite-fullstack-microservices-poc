import { Injectable, NotFoundException } from '@nestjs/common'
import { EventAttendeeRepository } from 'src/modules/events/entities/event-attendee.repository'
import { EventRepository } from 'src/modules/events/entities/event.repository'
import { CreateEventInput } from 'src/modules/events/inputs/create-event.input'
import { UpdateEventInput } from 'src/modules/events/inputs/update-event.input'
import { AMQPClientService } from 'src/modules/events/services/amqp-client.service'

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventAttendeeRepository: EventAttendeeRepository,
    private readonly amqpClientService: AMQPClientService
  ) {}

  async findOne(id: string) {
    const event = await this.eventRepository.findOneById(id)

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`)
    }

    return event
  }

  findAll() {
    return this.eventRepository.findAll()
  }

  async create(input: CreateEventInput) {
    const newEvent = this.eventRepository.create(input)

    await this.eventRepository.save(newEvent)

    return newEvent
  }

  async update(id: string, input: UpdateEventInput) {
    const event = await this.eventRepository.findOneById(id)

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`)
    }

    this.eventRepository.merge(event, input)
    await this.eventRepository.save(event)

    return event
  }

  async delete(id: string) {
    const deleteResult = await this.eventRepository.delete(id)

    if (!deleteResult.affected) {
      throw new NotFoundException(`Event with id ${id} not found`)
    }

    return true
  }

  // TODO: validate capacity
  // TODO: validate event in the future
  async attendEvent(eventId: string, userId: string) {
    const isUserExists = await this.amqpClientService.checkUserExists(userId)

    if (!isUserExists) {
      throw new NotFoundException(`User with id ${userId} does not exist`)
    }

    return this.eventAttendeeRepository.joinEvent(eventId, userId)
  }

  async unattendEvent(eventId: string, userId: string) {
    const attendee = await this.eventAttendeeRepository.findAttendee(
      eventId,
      userId
    )

    if (!attendee) {
      throw new NotFoundException(`Attendance record not found`)
    }

    await this.eventAttendeeRepository.remove(attendee)
    return this.findOne(eventId)
  }
}
