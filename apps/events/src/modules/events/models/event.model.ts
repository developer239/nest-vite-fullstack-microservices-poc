import { AttendeeModel } from '@app/events/modules/events/models/attendee.model'

export class EventModel {
  public id: number

  public title: string

  public description: string

  public startsAt: Date

  public capacity: number

  public cost: number

  public owner: AttendeeModel

  public attendees: AttendeeModel[]
}
