import { NotFoundException, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql'
import { GetUser, GqlAuthGuard, IUserPayload } from 'nest-helpers'
import { UpdateProfileInput } from 'src/modules/users/inputs/update-profile.input'
import { User } from 'src/modules/users/models/user.model'
import { UserService } from 'src/modules/users/services/user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // TODO: only show email for admin

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'me' })
  async getAuthenticatedUser(@GetUser() authenticatedUser: IUserPayload) {
    const user = await this.userService.findById(authenticatedUser.id)

    if (!user) {
      throw new NotFoundException(
        `User with id ${authenticatedUser.id} not found`
      )
    }

    return user
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateProfile(
    @Args('input') input: UpdateProfileInput,
    @GetUser() authenticatedUser: IUserPayload
  ) {
    return this.userService.updateUserProfile(authenticatedUser.id, input)
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
