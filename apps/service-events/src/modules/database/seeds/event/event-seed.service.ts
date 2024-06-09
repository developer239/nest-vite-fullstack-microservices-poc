import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ISeedService } from 'nest-helpers'
import { Repository } from 'typeorm'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { EventEntity } from 'src/modules/events/entities/event.entity'

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
      capacity: 10,
      attendees: [
        { userId: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1b3b0b1b3b' },
        { userId: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1b3b0b1ffc' },
      ],
      owner: { userId: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1b3b0b1ffc' },
      startsAt: new Date().toISOString(),
    })

    await this.createEvent({
      title: 'Event 2',
      description: 'Description for Event 2',
      capacity: 10,
      attendees: [{ userId: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1b3b0b1ffc' }],
      owner: { userId: 'f7b3b3b0-0b1b-4b3b-8b3b-0b1b3b0b1b3b' },
      startsAt: new Date().toISOString(),
    })

    Logger.log('Seeded events with attendees')
  }

  private async createEvent(data: DeepPartial<EventEntity>) {
    const event = this.eventRepository.create(data)
    await this.eventRepository.save(event)

    Logger.log(`Created event: ${JSON.stringify(data)}`)
  }
}
