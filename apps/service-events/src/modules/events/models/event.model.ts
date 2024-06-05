import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/modules/events/models/user.model'

@ObjectType()
export class Event {
  @Field(() => ID)
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field(() => [User])
  attendees: User[]
}
