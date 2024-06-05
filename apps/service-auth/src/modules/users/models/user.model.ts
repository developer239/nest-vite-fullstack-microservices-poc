import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number

  @Field()
  name: string

  @Field()
  email: string
}
