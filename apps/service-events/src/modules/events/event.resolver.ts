import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { EventService } from './event.service'
import { Event } from './models/event.model'
import { User } from 'src/modules/events/models/user.model'

@Resolver(() => Event)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Query((returns) => [Event])
  events() {
    return this.eventService.findAll()
  }

  @ResolveField('attendees', () => [User])
  getAttendees(@Parent() event: Event) {
    const { attendees } = event
    return attendees.map((id) => ({ __typename: 'User', id }))
  }
}
