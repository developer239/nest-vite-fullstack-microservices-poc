/* eslint-disable no-underscore-dangle */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { UpsertEventDto } from '@app/events/modules/events/dto/upsert-event.dto'
import { EventsRepository } from '@app/events/modules/events/entities/events.repository'
import { PAYMENTS_SERVICE_TOKEN } from '@shared/common/tokens'

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    @Inject(PAYMENTS_SERVICE_TOKEN) private readonly client: ClientProxy
  ) {}

  listEvents() {
    return this.eventsRepository.findAll()
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

    return event
  }

  createEvent(ownerId: number, data: UpsertEventDto) {
    return this.eventsRepository.create(ownerId, data)
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

    return event
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

  async attendEvent(userId: number, eventId: number, stripeToken: string) {
    const event = (await this.eventsRepository.findById(eventId))!

    if (event.cost > 0) {
      try {
        await firstValueFrom(
          this.client.send('PAYMENTS_CREATE_CHARGE', {
            entityId: eventId,
            entityType: event.__entity,
            userId,
            amount: event.cost,
            stripeToken,
          })
        )
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Charge creation failed',
          },
          HttpStatus.SERVICE_UNAVAILABLE
        )
      }
    }
    await this.eventsRepository.attend(userId, eventId)

    return event
  }

  async leaveEvent(userId: number, eventId: number) {
    const event = (await this.eventsRepository.findById(eventId))!

    if (event.cost > 0) {
      try {
        await firstValueFrom(
          this.client.send('PAYMENTS_REFUND_CHARGE', {
            entityId: eventId,
            entityType: event.__entity,
            userId,
            amount: event.cost,
          })
        )
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.SERVICE_UNAVAILABLE,
            message: 'Charge creation failed',
          },
          HttpStatus.SERVICE_UNAVAILABLE
        )
      }
    }
    await this.eventsRepository.leave(userId, eventId)

    return event
  }
}
