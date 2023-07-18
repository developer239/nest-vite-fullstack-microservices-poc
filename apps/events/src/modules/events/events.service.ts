/* eslint-disable no-underscore-dangle */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import {
  IPaymentsCreateChargeInput,
  IPaymentsRefundChargeInput,
  PAYMENTS_CREATE_CHARGE_MESSAGE_PATTERN,
  PAYMENTS_REFUND_CHARGE_MESSAGE_PATTERN,
} from '@app/events/interface'
import { UpsertEventDto } from '@app/events/modules/events/dto/upsert-event.dto'
import { EventsRepository } from '@app/events/modules/events/entities/events.repository'
import { PAYMENTS_SERVICE_TOKEN } from '@shared/common/tokens'

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    // TODO: refactor and create a separate class for payments messages
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

  async attendEvent(userId: number, eventId: number, stripeToken?: string) {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'event notFound',
        },
        HttpStatus.NOT_FOUND
      )
    }

    const isAttending = event.attendees.find(
      (attendee) => attendee.userId === userId
    )
    if (isAttending) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'user is already attending',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    if (event.attendees.length >= event.capacity) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'event is full',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    if (event.cost > 0) {
      if (!stripeToken) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'stripeToken is required',
          },
          HttpStatus.UNPROCESSABLE_ENTITY
        )
      }

      try {
        await firstValueFrom(
          this.client.send<void, IPaymentsCreateChargeInput>(
            PAYMENTS_CREATE_CHARGE_MESSAGE_PATTERN,
            {
              entityId: eventId,
              entityType: event.__entity,
              userId,
              amount: event.cost,
              stripeToken,
              description: `Event registration: ${event.title}`,
            }
          )
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

    return this.eventsRepository.attend(userId, eventId)
  }

  async leaveEvent(userId: number, eventId: number) {
    const event = (await this.eventsRepository.findById(eventId))!

    const isAttending = event.attendees.find(
      (attendee) => attendee.userId === userId
    )
    if (!isAttending) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'user is not attending',
        },
        HttpStatus.BAD_REQUEST
      )
    }

    if (event.cost > 0) {
      try {
        await firstValueFrom(
          this.client.send<void, IPaymentsRefundChargeInput>(
            PAYMENTS_REFUND_CHARGE_MESSAGE_PATTERN,
            {
              entityId: eventId,
              entityType: event.__entity,
              userId,
            }
          )
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

    return this.eventsRepository.leave(userId, eventId)
  }
}
