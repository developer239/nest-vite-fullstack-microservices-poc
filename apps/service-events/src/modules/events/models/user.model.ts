import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  id: number

  @Field()
  @Directive('@external')
  name: string

  @Field()
  @Directive('@external')
  email: string
}
