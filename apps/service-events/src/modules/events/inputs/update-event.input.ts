import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true }) title?: string

  @Field({ nullable: true }) description?: string

  @Field({ nullable: true }) startsAt?: Date

  @Field({ nullable: true }) capacity?: number
}
