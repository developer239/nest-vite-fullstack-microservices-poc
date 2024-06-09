/* eslint-disable max-lines-per-function,max-lines */
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

  describe('[query] events', () => {
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

  describe('[query] event', () => {
    it('should return a specific event by ID', async () => {
      // Arrange
      const { event } = await eventTestingEntityService.createTestEvent()

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .send({
          query: `
            query GetEvent($id: ID!) {
              event(id: $id) {
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
          variables: {
            id: event.id,
          },
        })
        .set('Content-Type', 'application/json')

      // Assert
      const expectedShape = {
        data: {
          event: {
            id: event.id,
            startsAt: event.startsAt.toISOString(),
            title: event.title,
            description: event.description,
            attendees: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
              }),
            ]),
            owner: {
              id: expect.any(String),
            },
          },
        },
      }
      expect(response.body).toMatchObject(expectedShape)
    })
  })

  describe('[mutation] createEvent', () => {
    it('should create a new event', async () => {
      // Arrange
      const input = {
        title: 'New Event',
        description: 'This is a new event',
        startsAt: new Date().toISOString(),
        capacity: 100,
      }

      const mockUserId = randUuid()

      MockFirebaseStrategy.setMockUser({
        id: mockUserId,
        role: UserRole.ADMIN,
      })

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({
          query: `
            mutation CreateEvent($input: CreateEventInput!) {
              createEvent(input: $input) {
                id
                title
                description
                startsAt
                capacity
                owner {
                  id
                }
              }
            }
          `,
          variables: {
            input,
          },
        })

      // Assert
      const expectedShape = {
        data: {
          createEvent: {
            id: expect.any(String),
            title: input.title,
            description: input.description,
            startsAt: input.startsAt,
            capacity: input.capacity,
            owner: {
              id: mockUserId,
            },
          },
        },
      }
      expect(response.body).toMatchObject(expectedShape)
    })
  })

  describe('[mutation] updateEvent', () => {
    it('should update an existing event', async () => {
      // Arrange
      const { event } = await eventTestingEntityService.createTestEvent()
      const input = {
        title: 'Updated Event',
        description: 'This is an updated event',
        startsAt: new Date().toISOString(),
        capacity: 50,
      }

      const mockUserId = randUuid()

      MockFirebaseStrategy.setMockUser({
        id: mockUserId,
        role: UserRole.ADMIN,
      })

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({
          query: `
            mutation UpdateEvent($id: ID!, $input: UpdateEventInput!) {
              updateEvent(id: $id, input: $input) {
                id
                title
                description
                startsAt
                capacity
                owner {
                  id
                }
              }
            }
          `,
          variables: {
            id: event.id,
            input,
          },
        })

      // Assert
      const expectedShape = {
        data: {
          updateEvent: {
            id: event.id,
            title: input.title,
            description: input.description,
            startsAt: input.startsAt,
            capacity: input.capacity,
            owner: {
              id: event.owner.userId,
            },
          },
        },
      }
      expect(response.body).toMatchObject(expectedShape)
    })
  })

  describe('[mutation] deleteEvent', () => {
    it('should delete an event by ID', async () => {
      // Arrange
      const { event } = await eventTestingEntityService.createTestEvent()

      const mockUserId = randUuid()

      MockFirebaseStrategy.setMockUser({
        id: mockUserId,
        role: UserRole.ADMIN,
      })

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({
          query: `
            mutation DeleteEvent($id: ID!) {
              deleteEvent(id: $id)
            }
          `,
          variables: {
            id: event.id,
          },
        })

      // Assert
      expect(response.body).toStrictEqual({
        data: {
          deleteEvent: true,
        },
      })
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

      const DEFAULT_NUMBER_OF_ATTENDEES = 2

      expect(response.body.data.attendEvent.attendees).toHaveLength(
        DEFAULT_NUMBER_OF_ATTENDEES + 1
      )
      expect(response.body).toStrictEqual(expectedShape)
    })
  })

  describe('[mutation] unattendEvent', () => {
    it('should allow a user to leave an event', async () => {
      // Arrange
      const { event } = await eventTestingEntityService.createTestEvent()

      // TODO: create robust test fixtures
      const attendeeId = event.attendees[0]!.userId

      MockFirebaseStrategy.setMockUser({
        id: attendeeId,
        role: UserRole.USER,
      })

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send({
          query: `
            mutation UnattendEvent($id: ID!) {
              unattendEvent(id: $id) {
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
          unattendEvent: {
            id: event.id,
            title: event.title,
            attendees: expect.not.arrayContaining([
              expect.objectContaining({
                id: attendeeId,
              }),
            ]),
          },
        },
      }

      const DEFAULT_NUMBER_OF_ATTENDEES = 2

      expect(response.body.data.unattendEvent.attendees).toHaveLength(
        DEFAULT_NUMBER_OF_ATTENDEES - 1
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
