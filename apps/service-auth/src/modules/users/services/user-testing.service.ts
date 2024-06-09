/* eslint-disable security/detect-object-injection */
import { Injectable } from '@nestjs/common'
import {
  rand,
  randEmail,
  randFirstName,
  randLastName,
  randUuid,
} from '@ngneat/falso'
import { TestingEntityService, UserRole } from 'backend-shared'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { UserEntity } from 'src/modules/users/entities/user.entity'

@Injectable()
export class UserTestingService extends TestingEntityService {
  public createUserData() {
    return {
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
      uid: randUuid(),
    }
  }

  public async createTestUser() {
    const email = randEmail()
    const firstName = randFirstName()
    const lastName = randLastName()
    const uid = randUuid()
    const role = rand([UserRole.USER, UserRole.ADMIN])

    const user = await this.saveFixture(UserEntity, {
      email,
      firstName,
      lastName,
      role,
      uid,
    })

    return {
      user,
      meta: {},
    }
  }

  public async createTestUsers(count: number): Promise<UserEntity[]> {
    const users: UserEntity[] = []

    await Promise.all(
      Array(count)
        .fill(0)
        .map(async () => {
          const { user } = await this.createTestUser()
          users.push(user)
        })
    )

    return users
  }

  public async createAuthenticatedUser(
    role: UserRole = UserRole.USER,
    shouldNotSerialize = false
  ) {
    const { user } = await this.createTestUser()
    user.role = role // Assign role to the user
    await user.save()

    if (shouldNotSerialize) {
      return {
        user,
        accessToken: 'any',
      }
    }

    return {
      user: instanceToPlain(
        plainToInstance(UserEntity, user, { groups: ['me'] }),
        {
          groups: ['me'],
        }
      ),
      accessToken: 'any',
    }
  }
}
