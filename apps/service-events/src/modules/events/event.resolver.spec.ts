/* eslint-disable max-lines-per-function */
import { INestApplication } from '@nestjs/common'
import { randUuid } from '@ngneat/falso'
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
import {
  beforeEach,
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  vitest,
} from 'vitest'
import { ConfigModule } from 'src/modules/config/config.module'
import { EventModule } from 'src/modules/events/events.module'
import { AMQPClientService } from 'src/modules/events/services/amqp-client.service'
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

  describe('[mutation] attendEvent', () => {
    it('should allow a user to join an event', async () => {
      // Arrange
      const { event } = await eventTestingEntityService.createTestEvent()

      const mockUserId = randUuid()

      MockFirebaseStrategy.setMockUser({
        id: mockUserId,
        role: UserRole.USER,
      })

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({
          query: `
            mutation AttendEvent($id: ID!) {
              attendEvent(id: $id) {
                id
                title
                attendees {
                  id
                }
              }
            }
          `,
          variables: {
            id: event.id,
          },
        })

      // Assert
      const expectedShape = {
        data: {
          attendEvent: {
            id: event.id,
            title: event.title,
            attendees: expect.arrayContaining([
              expect.objectContaining({
                id: mockUserId,
              }),
            ]),
          },
        },
      }

      // TODO: assert exact number of new attendees (1)
      // Note: createTestEvent helper adds 2 attendees by default
      const DEFAULT_NUMBER_OF_ATTENDEES = 2

      expect(response.body.data.attendEvent.attendees).toHaveLength(
        DEFAULT_NUMBER_OF_ATTENDEES + 1
      )
      expect(response.body).toStrictEqual(expectedShape)
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
          .overrideProvider(AMQPClientService)
          .useClass(
            class {
              checkUserExists = vitest.fn().mockResolvedValue(true)
            }
          )
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
