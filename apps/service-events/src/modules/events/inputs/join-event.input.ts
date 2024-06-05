import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class JoinEventInput {
  @Field(() => ID)
  eventId: number

  @Field(() => ID)
  userId: number
}
