import { Injectable } from '@nestjs/common'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { EventEntity } from 'src/modules/events/entities/event.entity'

export interface IEventModel {
  id: number
  name: string
  description: string
  attendees: number[]
}

@Injectable()
export class EntityModelMapService {
  mapEventToModel(event: DeepPartial<EventEntity>): IEventModel {
    return {
      id: event.id!,
      name: event.name!,
      description: event.description!,
      attendees: event.attendees?.map((attendee) => attendee.userId!) || [],
    }
  }

  mapEventToModelCollection(events: DeepPartial<EventEntity>[]): IEventModel[] {
    return events.map((event) => this.mapEventToModel(event))
  }
}
