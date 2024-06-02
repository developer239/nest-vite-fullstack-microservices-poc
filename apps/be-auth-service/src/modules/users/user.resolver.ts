import { Query, Resolver } from '@nestjs/graphql'
import { UserService } from 'src/modules/users/user.service'
import { User } from 'src/modules/users/models/user.model'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users() {
    return this.userService.findAll()
  }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: number }): User {
  //   const user = this.userService.findById(reference.id)
  //
  //   if (!user) {
  //     // TODO: maybe throw exception instead?
  //     throw new Error(`User with id ${reference.id} not found`)
  //   }
  //
  //   return user
  // }
}
