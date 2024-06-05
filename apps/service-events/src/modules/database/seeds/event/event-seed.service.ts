import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ISeedService } from 'backend-shared'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { DeepPartial } from 'typeorm/common/DeepPartial'

@Injectable()
export class EventSeedService implements ISeedService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>
  ) {}

  public async run() {
    await this.createEvent({
      title: 'Event 1',
      description: 'Description for Event 1',
      attendees: [{ userId: 1 }, { userId: 2 }],
    })

    await this.createEvent({
      title: 'Event 2',
      description: 'Description for Event 2',
      attendees: [{ userId: 2 }],
    })

    Logger.log('Seeded events with attendees')
  }

  private async createEvent(data: DeepPartial<EventEntity>) {
    const event = this.eventRepository.create(data)
    await this.eventRepository.save(event)

    Logger.log(`Created event: ${JSON.stringify(data)}`)
  }
}
