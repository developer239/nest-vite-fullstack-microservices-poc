import { Injectable } from '@nestjs/common'
import { randNumber, randWord, randFutureDate } from '@ngneat/falso'
import { EventEntity } from '@app/events/modules/events/entities/event.entity'
import { TestingEntityService } from '@shared/common/modules/testing/testing-entity.service'

@Injectable()
export class EventTestingService extends TestingEntityService {
  public createEventData(cost?: number) {
    return {
      title: randWord(),
      description: randWord(),
      capacity: randNumber({ min: 1, max: 100 }),
      startsAt: randFutureDate(),
      cost: cost === undefined ? randNumber({ min: 0, max: 1000 }) : cost,
    }
  }

  public async createTestEvent(
    ownerId = 1,
    cost?: number,
    attendees?: [{ userId: number }]
  ) {
    const eventData = this.createEventData(cost)

    const event = await this.saveFixture(EventEntity, {
      ...eventData,
      ownerUserId: ownerId,
      attendees,
    })

    return {
      event,
      meta: eventData,
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
