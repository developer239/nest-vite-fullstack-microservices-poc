import { Query, Resolver } from '@nestjs/graphql'
import { EventService } from './event.service'
import { Event } from './models/event.model'

@Resolver(() => Event)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Query((returns) => [Event])
  events() {
    return this.eventService.findAll()
  }
}
