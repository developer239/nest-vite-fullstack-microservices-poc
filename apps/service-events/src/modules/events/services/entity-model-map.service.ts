import { Injectable } from '@nestjs/common'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { EventEntity } from 'src/modules/events/entities/event.entity'

export interface IEventModel {
  id: string
  title: string
  description: string
  capacity: number
  startsAt: Date
  owner: string
  attendees: string[]
}

@Injectable()
export class EntityModelMapService {
  mapEventToModel(event: DeepPartial<EventEntity>): IEventModel {
    return {
      id: event.id!,
      title: event.title!,
      description: event.description!,
      capacity: event.capacity!,
      startsAt: event.startsAt! as Date,
      owner: event.owner?.id!,
      attendees: event.attendees?.map((attendee) => attendee.userId!) || [],
    }
  }

  mapEventToModelCollection(events: DeepPartial<EventEntity>[]): IEventModel[] {
    return events.map((event) => this.mapEventToModel(event))
  }
}
