export interface IUserIU {
  id: string
  email?: string
  firstName: string
  lastName: string
}

export interface IEventUI {
  id: string
  title: string
  description: string
  capacity: number
  startsAt: string
  owner: IUserIU
  attendees: IUserIU[]
}
