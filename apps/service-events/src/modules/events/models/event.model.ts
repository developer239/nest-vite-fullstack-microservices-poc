import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/modules/events/models/user.model'

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string

  @Field() title: string

  @Field() description: string

  @Field() capacity: number

  @Field() startsAt: Date

  @Field(() => User) owner: User

  @Field(() => [User]) attendees: User[]
}
