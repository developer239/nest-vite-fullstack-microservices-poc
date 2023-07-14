import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { Event } from '@app/events/modules/events/entities/event.entity'
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

  // TODO: figure out types
  async mapUsersToEvent(event: Event) {
    const users = await this.getUserData([
      event.ownerUserId,
      ...event.attendees.map((attendee) => attendee.userId),
    ])

    // @ts-ignore
    event.owner = users.find((user) => user.id === event.ownerUserId)
    event.attendees = event.attendees.map((attendee) => {
      const targetUser = users.find((user) => user.id === attendee.userId)
      // @ts-ignore
      attendee.firstName = targetUser?.firstName
      // @ts-ignore
      attendee.lastName = targetUser?.lastName

      return attendee
    })

    return event
  }
}
