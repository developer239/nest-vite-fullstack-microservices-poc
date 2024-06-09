import { INestApplication } from '@nestjs/common'
import {
  bootstrapTest,
  DatabaseModule,
  FirebaseService,
  FirebaseStrategy,
  GraphQLModule,
  MockFirebaseStrategy,
  TestingDatabaseService,
} from 'backend-shared'
import request from 'supertest'
import { beforeEach, describe, it, expect, beforeAll, afterAll } from 'vitest'
import { ConfigModule } from 'src/modules/config/config.module'
import { EventModule } from 'src/modules/events/events.module'
import { EventTestingService } from 'src/modules/events/services/user-testing.service'

describe('[events] resolver', () => {
  let app: INestApplication
  let databaseService: TestingDatabaseService
  let eventTestingEntityService: EventTestingService

  describe('[query] event', () => {
    it('should list events', async () => {
      // Arrange
      await eventTestingEntityService.createTestEvents(5)

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .send({
          query: `
            {
              events {
                id
                startsAt
                title
                description
                attendees {
                  id
                }
                owner {
                  id
                }
              }
            }
          `,
        })
        .set('Content-Type', 'application/json')

      // Assert
      const expectedShape = {
        data: {
          events: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              startsAt: expect.any(String),
              title: expect.any(String),
              description: expect.any(String),
              attendees: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(String),
                }),
              ]),
              owner: expect.objectContaining({
                id: expect.any(String),
              }),
            }),
          ]),
        },
      }
      expect(response.body).toMatchObject(expectedShape)
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
          EventModule,
        ],
        providers: [EventTestingService],
      },
      (moduleBuilder) =>
        moduleBuilder
          .overrideProvider(FirebaseStrategy)
          .useClass(MockFirebaseStrategy)
          .overrideProvider(FirebaseService)
          .useClass(class {})
    )

    databaseService = app.get(TestingDatabaseService)
    eventTestingEntityService = app.get(EventTestingService)
  })

  beforeEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await app.close()
  })
})
