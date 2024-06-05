import { NotFoundException } from '@nestjs/common'
import { Query, Resolver, ResolveReference } from '@nestjs/graphql'
import { User } from 'src/modules/users/models/user.model'
import { UserService } from 'src/modules/users/services/user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll()
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
