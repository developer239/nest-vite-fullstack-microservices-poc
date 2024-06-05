import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { JoinEventInput } from 'src/modules/events/inputs/join-event.input'
import { Event } from 'src/modules/events/models/event.model'
import { User } from 'src/modules/events/models/user.model'
import { EntityModelMapService } from 'src/modules/events/services/entity-model-map.service'
import { EventService } from 'src/modules/events/services/event.service'

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly entityModelMapService: EntityModelMapService
  ) {}

  @Query(() => [Event])
  async events() {
    const events = await this.eventService.findAll()

    return this.entityModelMapService.mapEventToModelCollection(events)
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

    return this.entityModelMapService.mapEventToModel(event)
  }
}
