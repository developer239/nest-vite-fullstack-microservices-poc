import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UpsertEventDto } from '@app/events/modules/events/dto/upsert-event.dto'
import { EventsRepository } from '@app/events/modules/events/entities/events.repository'
import { UsersService } from '@app/events/modules/events/users.service'

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly usersService: UsersService
  ) {}

  async listEvents() {
    const events = await this.eventsRepository.findAll()

    // TODO: implement mapUsersToEvents for more efficiency
    return Promise.all(
      events.map((event) => this.usersService.mapUsersToEvent(event))
    )
  }

  async detail(id: number) {
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

    return this.usersService.mapUsersToEvent(event)
  }

  async createEvent(ownerId: number, data: UpsertEventDto) {
    const event = await this.eventsRepository.create(ownerId, data)
    return this.usersService.mapUsersToEvent(event)
  }

  async updateEvent(ownerId: number, data: UpsertEventDto, eventId: number) {
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

    return this.usersService.mapUsersToEvent(event)
  }

  async deleteEvent(ownerId: number, eventId: number) {
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

  async attendEvent(userId: number, eventId: number) {
    const event = await this.eventsRepository.attend(userId, eventId)
    return this.usersService.mapUsersToEvent(event)
  }

  async leaveEvent(userId: number, eventId: number) {
    const event = await this.eventsRepository.leave(userId, eventId)
    return this.usersService.mapUsersToEvent(event)
  }
}
