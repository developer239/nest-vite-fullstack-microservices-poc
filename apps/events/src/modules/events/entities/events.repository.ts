import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpsertEventDto } from '@app/events/modules/events/dto/upsert-event.dto'
import { Attendee } from '@app/events/modules/events/entities/attendee.entity'
import { Event } from '@app/events/modules/events/entities/event.entity'

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(Attendee)
    private readonly attendeesRepository: Repository<Attendee>
  ) {}

  findAll() {
    return this.eventsRepository.find()
  }

  findById(id: number) {
    return this.eventsRepository.findOne({
      where: {
        id,
      },
    })
  }

  async create(ownerId: number, data: UpsertEventDto): Promise<Event> {
    const event = this.eventsRepository.create({
      ...data,
      ownerUserId: ownerId,
    })

    await this.eventsRepository.save(event)

    return event
  }

  async update(
    ownerId: number,
    data: UpsertEventDto,
    eventId: number
  ): Promise<Event | undefined> {
    const qb = this.eventsRepository
      .createQueryBuilder('event')
      .update(Event)
      .set(data)
      .where('event.id = :id', { id: eventId })
      .andWhere('event."ownerId" = :ownerId', { ownerId })

    const result = await qb.execute()

    if (result.affected) {
      const updatedEvent = await this.findById(eventId)
      return updatedEvent!
    }
  }

  async softDelete(ownerId: number, eventId: number): Promise<boolean> {
    const qb = this.eventsRepository
      .createQueryBuilder('event')
      .softDelete()
      .where('event.id = :id', { id: eventId })
      .andWhere('event."ownerId" = :ownerId', { ownerId })

    const result = await qb.execute()

    return Boolean(result.affected)
  }

  async attend(userId: number, eventId: number): Promise<Event> {
    const event = await this.findById(eventId)

    if (!event) {
      throw new Error(`Event with id ${eventId} not found`)
    }

    if (event.attendees.length >= event.capacity) {
      throw new Error(
        `User with id ${userId} is not attending event with id ${eventId}`
      )
    }

    let user = await this.attendeesRepository.findOne({
      where: {
        id: userId,
      },
    })

    if (!user) {
      user = await this.attendeesRepository
        .create({
          userId,
        })
        .save()
    }

    const userIndex = event.attendees.findIndex(
      (attendee) => attendee.userId === userId
    )
    if (userIndex !== -1) {
      event.attendees.push(user)
    }
    await this.eventsRepository.save(event)

    return event
  }

  async leave(userId: number, eventId: number): Promise<Event> {
    const event = await this.findById(eventId)

    if (!event) {
      throw new Error(`Event with id ${eventId} not found`)
    }

    const userIndex = event.attendees.findIndex(
      (user) => user.userId === userId
    )

    if (userIndex === -1) {
      throw new Error(
        `User with id ${userId} is not attending event with id ${eventId}`
      )
    }

    event.attendees.splice(userIndex, 1)

    await this.eventsRepository.save(event)

    return event
  }
}
