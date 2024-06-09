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
} from 'backend-shared'
import request from 'supertest'
import { beforeEach, describe, it, expect, beforeAll, afterAll } from 'vitest'
import { ConfigModule } from 'src/modules/config/config.module'
import { UserTestingService } from 'src/modules/users/services/user-testing.service'
import { UserModule } from 'src/modules/users/user.module'

describe('[users] resolver', () => {
  let app: INestApplication
  let databaseService: TestingDatabaseService
  let userTestingEntityService: UserTestingService

  describe('[query] user', () => {
    it('should return user by id', async () => {
      // Arrange
      const { user } = await userTestingEntityService.createAuthenticatedUser()

      MockFirebaseStrategy.setMockUser({
        role: UserRole.ADMIN,
      })

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .send({
          query: `
            query GetUser($id: ID!) {
              user(id: $id) {
                id
                firstName
                lastName
                email
              }
            }
          `,
          variables: {
            id: user.id,
          },
        })
        .set('Content-Type', 'application/json')

      // Assert
      expect(response.body).toStrictEqual({
        data: {
          user: {
            id: String(user.id),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      })
    })

    // TODO: test authentication when error messages are standardized
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
