import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Event {
  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field(() => [Number])
  attendees: number[]
}
