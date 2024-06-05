import { Query, Resolver, ResolveReference } from '@nestjs/graphql'
import { GraphQLException } from '@nestjs/graphql/dist/exceptions'
import { User } from 'src/modules/users/models/user.model'
import { UserService } from 'src/modules/users/user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users() {
    return this.userService.findAll()
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }) {
    const user = await this.userService.findById(reference.id)

    if (!user) {
      // TODO: is this correct way to handle exceptions?
      throw new GraphQLException(`User with id ${reference.id} not found`, {
        extensions: {
          http: {
            status: 404,
          },
        },
      })
    }

    return user
  }
}
