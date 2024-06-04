// event-seed.service.ts
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ISeedService } from 'backend-shared'
import { EventEntity } from 'src/modules/events/entities/event.entity'
import { AttendeeEntity } from 'src/modules/events/entities/attendee.entity'
import { EventAttendeeEntity } from 'src/modules/events/entities/event-attendee.entity'

@Injectable()
export class EventSeedService implements ISeedService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(AttendeeEntity)
    private readonly attendeeRepository: Repository<AttendeeEntity>,
    @InjectRepository(EventAttendeeEntity)
    private readonly eventAttendeeRepository: Repository<EventAttendeeEntity>
  ) {}

  public async run() {
    await this.createEvent({
      ownerUserId: 1,
      title: 'Event 1',
      description: 'Description for Event 1',
      eventAttendees: [
        { attendee: { userId: 1 }, hasPaid: true },
        { attendee: { userId: 2 }, hasPaid: false },
      ],
    })

    await this.createEvent({
      ownerUserId: 2,
      title: 'Event 2',
      description: 'Description for Event 2',
      eventAttendees: [
        { attendee: { userId: 3 }, hasPaid: true },
        { attendee: { userId: 4 }, hasPaid: true },
      ],
    })

    await this.createEvent({
      ownerUserId: 3,
      title: 'Event 3',
      description: 'Description for Event 3',
      eventAttendees: [
        { attendee: { userId: 5 }, hasPaid: false },
        { attendee: { userId: 6 }, hasPaid: true },
      ],
    })

    Logger.log('Seeded events with attendees')
  }

  private async createEvent(data: any) {
    const event = this.eventRepository.create(data)[0]!

    if (data.eventAttendees) {
      event.eventAttendees = await Promise.all(
        data.eventAttendees.map(async (eventAttendee: any) => {
          const attendee = await this.attendeeRepository.findOne({
            where: { userId: eventAttendee.attendee.userId },
          })

          if (!attendee) {
            const newAttendee = this.attendeeRepository.create(
              eventAttendee.attendee
            )
            await this.attendeeRepository.save(newAttendee)
            eventAttendee.attendee = newAttendee
          } else {
            eventAttendee.attendee = attendee
          }

          return eventAttendee
        })
      )
    }

    await this.eventRepository.save(event)
    Logger.log(`Created event: ${JSON.stringify(data)}`)
  }
}
