import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateEventInput {
  @Field() title: string

  @Field() description: string

  @Field() startsAt: Date

  @Field() capacity: number
}
