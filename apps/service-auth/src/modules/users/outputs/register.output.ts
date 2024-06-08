import { Field, ObjectType } from '@nestjs/graphql'
import { User } from 'src/modules/users/models/user.model'

@ObjectType()
export class RegisterOutput {
  @Field(() => User)
  user: User

  @Field()
  accessToken: string

  @Field()
  refreshToken: string
}
