import {
  Args,
  Field,
  ID,
  InputType,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { EventService } from './services/event.service'
import { Event } from './models/event.model'
import { User } from 'src/modules/events/models/user.model'

// TODO: move to separate file
@InputType()
export class JoinEventInput {
  @Field(() => ID)
  eventId: number

  @Field(() => ID)
  userId: number
}

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

  @Mutation(() => Event)
  async joinEvent(@Args('input') input: JoinEventInput) {
    await this.eventService.joinEvent(input.eventId, input.userId)

    const event = await this.eventService.findOne(input.eventId)

    return {
      id: event.id,
      name: event.name,
      description: event.description,
      attendees: event.attendees.map((attendee) => attendee.userId),
    }
  }
}
