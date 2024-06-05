import { Query, Resolver, ResolveReference } from '@nestjs/graphql'
import { UserService } from 'src/modules/users/user.service'
import { User } from 'src/modules/users/models/user.model'
import { GraphQLException } from '@nestjs/graphql/dist/exceptions'

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
