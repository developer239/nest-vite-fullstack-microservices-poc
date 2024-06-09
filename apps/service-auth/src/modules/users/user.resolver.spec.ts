import { INestApplication } from '@nestjs/common'
import {
  bootstrapTest,
  DatabaseModule,
  GraphQLModule,
  TestingDatabaseService,
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

  describe('it is', () => {
    it('defined', async () => {
      // Arrange
      const { user } = await userTestingEntityService.createAuthenticatedUser()

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
  })

  //
  // Setup

  beforeAll(async () => {
    app = await bootstrapTest({
      imports: [
        ConfigModule,
        DatabaseModule.forRootAsync(),
        GraphQLModule.forRoot(),
        UserModule,
      ],
      providers: [UserTestingService],
    })

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
