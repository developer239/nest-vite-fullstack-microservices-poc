import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number

  @Field() firstName: string

  @Field() lastName: string

  @Field() email: string
}
