import { Injectable } from '@nestjs/common'

@Injectable()
export class EventService {
  private readonly events = [
    {
      id: 1,
      name: 'GraphQL Introduction',
      description: 'Learn about GraphQL basics',
      attendees: [1, 2], // Assuming these are user IDs for example
    },
    {
      id: 2,
      name: 'Advanced GraphQL',
      description: 'Deep dive into GraphQL features',
      attendees: [3],
    },
  ]

  findAll() {
    return this.events
  }
}
