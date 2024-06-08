import { NotFoundException, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql'
import { GqlAuthGuard, Roles, RolesGuard, UserRole } from 'backend-shared'
import { RegisterInput } from 'src/modules/users/inputs/register.input'
import { User } from 'src/modules/users/models/user.model'
import { RegisterOutput } from 'src/modules/users/outputs/register.output'
import { UserService } from 'src/modules/users/services/user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // TODO: only show email for admin

  @Mutation(() => RegisterOutput)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    const user = await this.userService.register(input)
    return user
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
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
