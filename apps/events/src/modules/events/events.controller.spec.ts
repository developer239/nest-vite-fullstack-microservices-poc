/* eslint-disable max-lines-per-function, max-lines */
import { INestApplication } from '@nestjs/common'
import { of } from 'rxjs'
import * as request from 'supertest'
import { WrappedConfigModule } from '@app/events/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/events/modules/database/database.module'
import { EventTestingService } from '@app/events/modules/events/entities/event-testing.service'
import { EventsModule } from '@app/events/modules/events/events.module'
import { TestingDatabaseService } from '@shared/common/modules/testing/testing-database.service'
import { bootstrap } from '@shared/common/modules/testing/utilities'
import {
  AUTH_SERVICE_TOKEN,
  PAYMENTS_SERVICE_TOKEN,
} from '@shared/common/tokens'

describe('[events] controller', () => {
  let app: INestApplication
  let databaseService: TestingDatabaseService
  let testingEntityService: EventTestingService

  describe('GET /events', () => {
    it('should fetch events', async () => {
      // Arrange
      const data = await testingEntityService.createTestEvents(1)

      // Act
      const server = app.getHttpServer()
      const response = await request(server).get('/v1/events')

      // Assert
      expect(response.status).toBe(200)
      expect(response.body[0]).toMatchObject({
        id: data[0].id,
        ownerUserId: data[0].ownerUserId,
        title: data[0].title,
        description: data[0].description,
        capacity: data[0].capacity,
        cost: data[0].cost,
        attendees: [],
        startsAt: data[0].startsAt.toISOString(),
      })
    })
  })

  describe('GET /events/:id', () => {
    it('should fetch event detail', async () => {
      // Arrange
      const { event } = await testingEntityService.createTestEvent()

      // Act
      const server = app.getHttpServer()
      const response = await request(server).get(`/v1/events/${event.id}`)

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual({
        id: event.id,
        ownerUserId: event.ownerUserId,
        title: event.title,
        description: event.description,
        capacity: event.capacity,
        cost: event.cost,
        attendees: [],
        startsAt: event.startsAt.toISOString(),
      })
    })

    describe('when event does not exist', () => {
      it('should return 404', async () => {
        // Act
        const server = app.getHttpServer()
        const response = await request(server).get('/api/v1/events/1')

        // Assert
        expect(response.status).toBe(404)
      })
    })
  })

  describe('POST /events', () => {
    it('should create new event', async () => {
      // Arrange
      const accessToken = 'BEARER_TOKEN'
      const data = testingEntityService.createEventData()

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post('/v1/events')
        .send(data)
        .set('Authorization', `Bearer ${accessToken}`)

      // Assert
      expect(response.status).toBe(201)
      expect(response.body).toStrictEqual({
        id: expect.any(Number),
        ownerUserId: expect.any(Number),
        ...data,
        startsAt: data.startsAt.toISOString(),
      })
    })

    describe('when user is not authenticated', () => {
      it('should return 403', async () => {
        // Act
        const server = app.getHttpServer()
        const response = await request(server).post('/v1/events')

        // Assert
        expect(response.status).toBe(403)
      })
    })
  })

  describe('PATCH /events/:id', () => {
    it('should update event', async () => {
      // Arrange
      const accessToken = 'BEARER_TOKEN'
      const { event } = await testingEntityService.createTestEvent()

      const updatedData = testingEntityService.createEventData()

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .patch(`/v1/events/${event.id}`)
        .send(updatedData)
        .set('Authorization', `Bearer ${accessToken}`)

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual({
        id: event.id,
        ...updatedData,
        ownerUserId: 1,
        attendees: [],
        startsAt: updatedData.startsAt.toISOString(),
      })
    })

    describe('when user is not authenticated', () => {
      it('should return 403', async () => {
        // Arrange
        const { event } = await testingEntityService.createTestEvent()

        // Act
        const server = app.getHttpServer()
        const response = await request(server).patch(`/v1/events/${event.id}`)

        // Assert
        expect(response.status).toBe(403)
      })
    })

    describe('when user is not owner', () => {
      it('should return 404', async () => {
        // Arrange
        const accessToken = 'BEARER_TOKEN'
        const { event } = await testingEntityService.createTestEvent(99)

        const updatedData = testingEntityService.createEventData()

        // Act
        const server = app.getHttpServer()
        const response = await request(server)
          .patch(`/v1/events/${event.id}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(updatedData)

        // Assert
        expect(response.status).toBe(404)
      })
    })
  })

  describe('DELETE /events/:id', () => {
    it('should delete event', async () => {
      // Arrange
      const accessToken = 'BEARER_TOKEN'
      const { event } = await testingEntityService.createTestEvent()

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .delete(`/v1/events/${event.id}`)
        .set('Authorization', `Bearer ${accessToken}`)

      // Assert
      expect(response.status).toBe(200)
    })

    describe('when user is not authenticated', () => {
      it('should return 401', async () => {
        // Arrange
        const { event } = await testingEntityService.createTestEvent()

        // Act
        const server = app.getHttpServer()
        const response = await request(server).delete(`/v1/events/${event.id}`)

        // Assert
        expect(response.status).toBe(403)
      })
    })

    describe('when user is not owner', () => {
      it('should return 404', async () => {
        // Arrange
        const accessToken = 'BEARER_TOKEN'
        const { event } = await testingEntityService.createTestEvent(99)

        // Act
        const server = app.getHttpServer()
        const response = await request(server)
          .delete(`/v1/events/${event.id}`)
          .set('Authorization', `Bearer ${accessToken}`)

        // Assert
        expect(response.status).toBe(404)
      })
    })
  })

  // describe('POST /events/:id/attendees/me', () => {
  //   it('should add me to attendees', async () => {
  //     // Arrange
  //     const { user, accessToken } =
  //       await testingEntityService.createAuthenticatedUser(jwtService)
  //
  //     const data = await testingEntityService.createEvent(0)
  //
  //     // Act
  //     const server = app.getHttpServer()
  //     const response = await request(server)
  //       .post(`/api/v1/events/${data.id}/attendees/me`)
  //       .set('Authorization', `Bearer ${accessToken}`)
  //
  //     // Assert
  //     expect(response.status).toBe(200)
  //     expect(response.body).toStrictEqual({
  //       ...data,
  //       attendees: [user],
  //     })
  //   })
  //
  //   describe('when user is not authenticated', () => {
  //     it('should return 401', async () => {
  //       // Arrange
  //       const { id } = await testingEntityService.createEvent(0)
  //
  //       // Act
  //       const server = app.getHttpServer()
  //       const response = await request(server).post(
  //         `/api/v1/events/${id}/attendees/me`
  //       )
  //
  //       // Assert
  //       expect(response.status).toBe(401)
  //     })
  //   })
  //
  //   // TODO:
  //   // describe('when user is already attendee', () => {
  //   //
  //   // })
  // })
  //
  // describe('DELETE /events/:id/attendees/me', () => {
  //   it('should add remove me from attendees', async () => {
  //     // Arrange
  //     const { user, accessToken } =
  //       await testingEntityService.createAuthenticatedUser(jwtService)
  //
  //     const data = await testingEntityService.createEvent(0, undefined, user.id)
  //
  //     // Act
  //     const server = app.getHttpServer()
  //     const response = await request(server)
  //       .delete(`/api/v1/events/${data.id}/attendees/me`)
  //       .set('Authorization', `Bearer ${accessToken}`)
  //
  //     // Assert
  //     expect(response.status).toBe(200)
  //     expect(response.body).toStrictEqual({
  //       ...data,
  //       attendees: [],
  //     })
  //   })
  //
  //   // TODO:
  //   // describe('when user not in attendees', () => {
  //   //
  //   // })
  // })

  //
  //
  // setup

  beforeAll(async () => {
    app = await bootstrap(
      {
        imports: [WrappedConfigModule, WrappedDatabaseModule, EventsModule],
        providers: [EventTestingService],
      },
      {
        providers: [
          {
            provide: AUTH_SERVICE_TOKEN,
            useValue: {
              send: () => of({ id: 1 }),
            },
          },
          { provide: PAYMENTS_SERVICE_TOKEN, useValue: jest.fn() },
        ],
      }
    )

    databaseService = app.get(TestingDatabaseService)
    testingEntityService = app.get(EventTestingService)
  })

  beforeEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.dataSource.destroy()
  })
})
