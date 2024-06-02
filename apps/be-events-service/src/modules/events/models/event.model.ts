import { ObjectType, Field, ID, Int } from '@nestjs/graphql'

@ObjectType()
export class Event {
  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field((type) => [Int])
  attendees: number[]
}
