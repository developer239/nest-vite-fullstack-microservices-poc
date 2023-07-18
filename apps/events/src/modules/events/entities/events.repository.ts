import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpsertEventDto } from '@app/events/modules/events/dto/upsert-event.dto'
import { AttendeeEntity } from '@app/events/modules/events/entities/attendee.entity'
import { EventEntity } from '@app/events/modules/events/entities/event.entity'

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>,
    @InjectRepository(AttendeeEntity)
    private readonly attendeesRepository: Repository<AttendeeEntity>
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

  async create(ownerId: number, data: UpsertEventDto): Promise<EventEntity> {
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
  ): Promise<EventEntity | undefined> {
    const qb = this.eventsRepository
      .createQueryBuilder('event')
      .update(EventEntity)
      .set(data)
      .where('event.id = :id', { id: eventId })
      .andWhere('event."ownerUserId" = :ownerId', { ownerId })

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
      .andWhere('event."ownerUserId" = :ownerId', { ownerId })

    const result = await qb.execute()

    return Boolean(result.affected)
  }

  async attend(userId: number, eventId: number): Promise<EventEntity> {
    const event = await this.findById(eventId)

    if (!event) {
      throw new Error(`Event with id ${eventId} not found`)
    }

    if (event.attendees.length >= event.capacity) {
      throw new Error(`Event with id ${eventId} is full`)
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
    if (userIndex === -1) {
      event.attendees.push(user)
    }
    await this.eventsRepository.save(event)

    return event
  }

  async leave(userId: number, eventId: number): Promise<EventEntity> {
    const event = await this.findById(eventId)

    if (!event) {
      throw new Error(`Event with id ${eventId} not found`)
    }

    const userIndex = event.attendees.findIndex(
      (user) => user.userId === userId
    )
    if (userIndex === -1) {
      return event
    }

    event.attendees.splice(userIndex, 1)
    await this.eventsRepository.save(event)

    return event
  }
}
