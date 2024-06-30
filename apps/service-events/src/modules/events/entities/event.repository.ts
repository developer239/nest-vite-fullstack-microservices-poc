import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { CreateEventInput } from 'src/modules/events/inputs/create-event.input'
import { UpdateEventInput } from 'src/modules/events/inputs/update-event.input'

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>
  ) {}

  findOneById(id: string) {
    return this.eventsRepository.findOneBy({ id })
  }

  findAll() {
    return this.eventsRepository.find()
  }

  create(input: CreateEventInput, ownerId: string) {
    const newEvent = this.eventsRepository.create({
      ...input,
      owner: {
        userId: ownerId,
      },
    })

    return this.save(newEvent)
  }

  save(event: EventEntity) {
    return this.eventsRepository.save(event)
  }

  merge(event: EventEntity, input: UpdateEventInput) {
    return this.eventsRepository.merge(event, input)
  }

  delete(id: string) {
    return this.eventsRepository.delete(id)
  }
}
