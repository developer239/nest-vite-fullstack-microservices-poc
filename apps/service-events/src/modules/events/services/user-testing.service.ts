/* eslint-disable security/detect-object-injection */
import { Injectable } from '@nestjs/common'
import {
  randNumber,
  randSuperheroName,
  randText,
  randUuid,
} from '@ngneat/falso'
import { TestingEntityService } from 'backend-shared'
import { EventEntity } from 'src/modules/events/entities/event.entity'

@Injectable()
export class EventTestingService extends TestingEntityService {
  public createEventData() {
    return {
      title: randSuperheroName(),
      description: randText(),
      capacity: randNumber({ min: 1, max: 100 }),
      startsAt: new Date(),
    }
  }

  // TODO: enable overrides (event information, owner information, attendees information)
  public async createTestEvent() {
    const event = await this.saveFixture(EventEntity, {
      ...this.createEventData(),
      owner: {
        userId: randUuid(),
      },
      attendees: [
        {
          userId: randUuid(),
        },
        {
          userId: randUuid(),
        },
      ],
    })

    return {
      event,
      meta: {},
    }
  }

  public async createTestEvents(count: number): Promise<EventEntity[]> {
    const events: EventEntity[] = []

    await Promise.all(
      Array(count)
        .fill(0)
        .map(async () => {
          const { event } = await this.createTestEvent()
          events.push(event)
        })
    )

    return events
  }
}
