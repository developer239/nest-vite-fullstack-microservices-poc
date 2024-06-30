import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  id: string

  @Field()
  @Directive('@external')
  firstName: string

  @Field()
  @Directive('@external')
  lastName: string

  @Field()
  @Directive('@external')
  email: string
}
