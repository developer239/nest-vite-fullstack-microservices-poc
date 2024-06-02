import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  email: string
}
