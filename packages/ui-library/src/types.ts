export type UserDTO = {
  id: string
  email?: string
  firstName: string
  lastName: string
}

export type EventDTO = {
  id: string
  title: string
  description: string
  capacity: number
  startsAt: string
  owner: UserDTO
  attendees: UserDTO[]
}
