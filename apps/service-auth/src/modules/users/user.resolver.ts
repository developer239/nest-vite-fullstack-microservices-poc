import { NotFoundException } from '@nestjs/common'
import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql'
import { User } from 'src/modules/users/models/user.model'
import { UserService } from 'src/modules/users/services/user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // TODO: only show email for admin

  // TODO: only admin
  @Query(() => User)
  async user(@Args('id') id: string) {
    const user = await this.userService.findById(id)

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return user
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    const user = await this.userService.findById(reference.id)

    if (!user) {
      throw new NotFoundException(`User with id ${reference.id} not found`)
    }

    return user
  }
}
