import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UpsertEventDto } from '@app/events/modules/events/dto/upsert-event.dto'
import { Event } from '@app/events/modules/events/entities/event.entity'
import { EventsRepository } from '@app/events/modules/events/entities/events.repository'

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  listEvents(): Promise<Event[]> {
    return this.eventsRepository.findAll()
  }

  async detail(id: number): Promise<Event> {
    const event = await this.eventsRepository.findById(id)

    if (!event) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'event notFound',
        },
        HttpStatus.NOT_FOUND
      )
    }

    return event
  }

  createEvent(ownerId: number, data: UpsertEventDto): Promise<Event> {
    return this.eventsRepository.create(ownerId, data)
  }

  async updateEvent(
    ownerId: number,
    data: UpsertEventDto,
    eventId: number
  ): Promise<Event> {
    const event = await this.eventsRepository.update(ownerId, data, eventId)

    if (!event) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'event notFound',
        },
        HttpStatus.NOT_FOUND
      )
    }

    return event
  }

  async deleteEvent(ownerId: number, eventId: number): Promise<void> {
    const isDeleted = await this.eventsRepository.softDelete(ownerId, eventId)

    if (!isDeleted) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'event notFound',
        },
        HttpStatus.NOT_FOUND
      )
    }
  }

  attendEvent(userId: number, eventId: number): Promise<Event> {
    return this.eventsRepository.attend(userId, eventId)
  }

  leaveEvent(userId: number, eventId: number): Promise<Event> {
    return this.eventsRepository.leave(userId, eventId)
  }
}
