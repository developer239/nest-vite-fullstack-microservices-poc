import { Query, Resolver, ResolveReference } from '@nestjs/graphql'
import { UserService } from 'src/modules/users/user.service'
import { User } from 'src/modules/users/models/user.model'
import { NotFoundException } from '@nestjs/common'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User])
  users() {
    return this.userService.findAll()
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    const user = this.userService.findById(reference.id)

    if (!user) {
      throw new NotFoundException(`User with id ${reference.id} not found`)
    }

    return user
  }
}
