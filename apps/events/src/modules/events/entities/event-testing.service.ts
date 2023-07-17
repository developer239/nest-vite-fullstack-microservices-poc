import { Injectable } from '@nestjs/common'
import { randNumber, randText, randWord, randFutureDate } from '@ngneat/falso'
import { AttendeeEntity } from '@app/events/modules/events/entities/attendee.entity'
import { EventEntity } from '@app/events/modules/events/entities/event.entity'
import { TestingEntityService } from '@shared/common/modules/testing/testing-entity.service'

@Injectable()
export class EventTestingService extends TestingEntityService {
  public createEventData() {
    return {
      ownerUserId: randNumber({ min: 1, max: 100 }),
      title: randWord({ length: 10 }),
      description: randText({ length: 100 }),
      capacity: randNumber({ min: 1, max: 100 }),
      cost: randNumber({ min: 1, max: 100, precision: 0.01 }),
      startsAt: randFutureDate(),
    }
  }

  public createAttendeeData() {
    return {
      userId: randNumber({ min: 1, max: 100 }),
    }
  }

  public async createTestEvent() {
    const eventData = this.createEventData()

    const event = await this.saveFixture(EventEntity, eventData)

    return {
      event,
      meta: eventData,
    }
  }

  public async createTestAttendee() {
    const attendeeData = this.createAttendeeData()

    const attendee = await this.saveFixture(AttendeeEntity, attendeeData)

    return {
      attendee,
      meta: attendeeData,
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

  public async createTestAttendees(count: number): Promise<AttendeeEntity[]> {
    const attendees: AttendeeEntity[] = []

    await Promise.all(
      Array(count)
        .fill(0)
        .map(async () => {
          const { attendee } = await this.createTestAttendee()
          attendees.push(attendee)
        })
    )

    return attendees
  }
}
