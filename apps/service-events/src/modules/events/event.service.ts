import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventRepository } from 'src/modules/events/entities/event.repository'
import { ClientProxy } from '@nestjs/microservices'
import { EventAttendeeRepository } from 'src/modules/events/entities/event-attendee.repository'
import { EmptyResponseException } from '@nestjs/microservices/errors/empty-response.exception'
import { GraphQLException } from '@nestjs/graphql/dist/exceptions'

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly eventAttendeeRepository: EventAttendeeRepository,
    @Inject('RABBITMQ_SERVICE') private readonly rabbitClient: ClientProxy
  ) {}

  async fndOne(id: number) {
    const event = await this.eventRepository.findOne(id)

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`)
    }

    return event
  }

  async findAll() {
    const events = await this.eventRepository.findAll()

    return events.map((event) => ({
      id: event.id,
      name: event.name,
      description: event.description,
      attendees: event.attendees.map((attendee) => attendee.userId),
    }))
  }

  async joinEvent(eventId: number, userId: number) {
    const userExists = await this.checkUserExists(userId)

    if (!userExists) {
      // TODO: is this correct way to handle exceptions?
      throw new GraphQLException('User does not exist', {
        extensions: {
          http: {
            status: 404,
          },
        },
      })
    }

    await this.eventAttendeeRepository.joinEvent(eventId, userId)
  }

  async checkUserExists(userId: number): Promise<boolean> {
    const response = await this.rabbitClient
      // TODO: move cmd name and response to packages
      .send<{ exists: boolean }, { userId: number }>(
        { cmd: 'check_user_exists' },
        { userId }
      )
      .toPromise()

    if (!response) {
      throw new EmptyResponseException('Could not check if user exists')
    }

    return response.exists
  }
}
