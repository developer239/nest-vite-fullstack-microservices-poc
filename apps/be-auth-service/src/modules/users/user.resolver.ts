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
}
