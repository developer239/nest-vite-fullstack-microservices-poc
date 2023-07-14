import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { EventEntity } from '@app/events/modules/events/entities/event.entity'
import { AttendeeModel } from '@app/events/modules/events/models/attendee.model'
import { EventModel } from '@app/events/modules/events/models/event.model'
import { IUser } from '@shared/common/interfaces'
import { AUTH_MICRO_SERVICE_TOKEN } from '@shared/common/modules/auth/tokens'

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_MICRO_SERVICE_TOKEN)
    private readonly client: ClientProxy
  ) {}

  getUserData(userIds: number[]): Promise<IUser[]> {
    return firstValueFrom(
      this.client.send<IUser[], { payload: number[] }>('AUTH_USERS_LIST', {
        payload: userIds,
      })
    )
  }

  async mapUsersToEvent(event: EventEntity): Promise<EventModel> {
    const users = await this.getUserData([
      event.ownerUserId,
      ...event.attendees.map((attendee) => attendee.userId),
    ])

    const eventModel = new EventModel()
    eventModel.id = event.id
    eventModel.title = event.title
    eventModel.description = event.description
    eventModel.capacity = event.capacity
    eventModel.startsAt = event.startsAt

    const owner = users.find((user) => user.id === event.ownerUserId)

    eventModel.owner = new AttendeeModel()
    if (owner) {
      eventModel.owner.id = owner.id
      eventModel.owner.firstName = owner.firstName
      eventModel.owner.lastName = owner.lastName
    }

    eventModel.attendees = event.attendees.map((attendee) => {
      const targetUser = users.find((user) => user.id === attendee.userId)
      const attendeeModel = new AttendeeModel()

      if (targetUser) {
        attendeeModel.id = attendee.id
        attendeeModel.firstName = targetUser.firstName
        attendeeModel.lastName = targetUser.lastName
      }

      return attendeeModel
    })

    return eventModel
  }
}
