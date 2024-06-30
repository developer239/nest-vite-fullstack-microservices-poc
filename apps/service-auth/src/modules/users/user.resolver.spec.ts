/* eslint-disable max-lines-per-function */
import { INestApplication } from '@nestjs/common'
import {
  bootstrapTest,
  DatabaseModule,
  FirebaseService,
  FirebaseStrategy,
  GraphQLModule,
  MockFirebaseStrategy,
  TestingDatabaseService,
  UserRole,
} from 'nest-helpers'
import request from 'supertest'
import { beforeEach, describe, it, expect, beforeAll, afterAll } from 'vitest'
import { ConfigModule } from 'src/modules/config/config.module'
import { UserTestingService } from 'src/modules/users/services/user-testing.service'
import { UserModule } from 'src/modules/users/user.module'

describe('[users] resolver', () => {
  let app: INestApplication
  let databaseService: TestingDatabaseService
  let userTestingEntityService: UserTestingService

  describe('[query] me', () => {
    it('should return the authenticated user', async () => {
      // Arrange
      const { user } = await userTestingEntityService.createAuthenticatedUser()

      MockFirebaseStrategy.setMockUser({
        id: user.id,
        role: UserRole.USER,
      })

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .send({
          query: `
            query {
              me {
                id
                firstName
                lastName
                email
              }
            }
          `,
        })
        .set('Content-Type', 'application/json')

      // Assert
      expect(response.body).toStrictEqual({
        data: {
          me: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      })
    })
  })

  describe('[mutation] updateProfile', () => {
    it('should update the user profile', async () => {
      // Arrange
      const { user } = await userTestingEntityService.createAuthenticatedUser()

      MockFirebaseStrategy.setMockUser({
        id: user.id,
        role: UserRole.USER,
      })

      const newFirstName = 'UpdatedFirstName'
      const newLastName = 'UpdatedLastName'

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .send({
          query: `
            mutation UpdateProfile($input: UpdateProfileInput!) {
              updateProfile(input: $input) {
                id
                firstName
                lastName
              }
            }
          `,
          variables: {
            input: {
              firstName: newFirstName,
              lastName: newLastName,
            },
          },
        })
        .set('Content-Type', 'application/json')

      // Assert
      expect(response.body).toStrictEqual({
        data: {
          updateProfile: {
            id: user.id,
            firstName: newFirstName,
            lastName: newLastName,
          },
        },
      })
    })
  })

  //
  // Setup

  beforeAll(async () => {
    app = await bootstrapTest(
      {
        imports: [
          ConfigModule,
          DatabaseModule.forRootAsync(),
          GraphQLModule.forRoot(),
          UserModule,
        ],
        providers: [UserTestingService],
      },
      (moduleBuilder) =>
        moduleBuilder
          .overrideProvider(FirebaseStrategy)
          .useClass(MockFirebaseStrategy)
          .overrideProvider(FirebaseService)
          .useClass(class {})
    )

    databaseService = app.get(TestingDatabaseService)
    userTestingEntityService = app.get(UserTestingService)
  })

  beforeEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await app.close()
  })
})
