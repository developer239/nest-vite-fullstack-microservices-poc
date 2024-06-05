import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EventEntity } from 'src/modules/events/entities/event.entity'

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>
  ) {}

  findOneById(id: number) {
    return this.eventsRepository.findOneBy({ id })
  }

  findAll() {
    return this.eventsRepository.find()
  }
}
