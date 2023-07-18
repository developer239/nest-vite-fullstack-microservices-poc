/* eslint-disable max-lines-per-function, max-lines */
import { INestApplication } from '@nestjs/common'
import { of } from 'rxjs'
import * as request from 'supertest'
import {
  IPaymentsCreateChargeInput,
  IPaymentsRefundChargeInput,
  PAYMENTS_CREATE_CHARGE_MESSAGE_PATTERN,
  PAYMENTS_REFUND_CHARGE_MESSAGE_PATTERN,
} from '@app/events/interface'
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

const DEFAULT_USER_ID = 1
const SOME_ELSE_USER_ID = DEFAULT_USER_ID + 99

const paymentClientMock = {
  send: jest.fn().mockImplementation(() => of({})),
}

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
        const { event } = await testingEntityService.createTestEvent(
          SOME_ELSE_USER_ID
        )

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
      it('should return 403', async () => {
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
        const { event } = await testingEntityService.createTestEvent(
          SOME_ELSE_USER_ID
        )

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

  describe('POST /events/:id/attendees/me', () => {
    it('should add me to attendees', async () => {
      // Arrange
      const accessToken = 'BEARER_TOKEN'
      const { event } = await testingEntityService.createTestEvent(
        DEFAULT_USER_ID,
        0
      )

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .post(`/v1/events/${event.id}/attendees/me`)
        .set('Authorization', `Bearer ${accessToken}`)

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual({
        id: event.id,
        ownerUserId: event.ownerUserId,
        title: event.title,
        description: event.description,
        capacity: event.capacity,
        cost: event.cost,
        attendees: [
          {
            id: expect.any(Number),
            userId: DEFAULT_USER_ID,
          },
        ],
        startsAt: event.startsAt.toISOString(),
      })
    })

    describe('when user is not authenticated', () => {
      it('should return 403', async () => {
        // Arrange

        // Act
        const server = app.getHttpServer()
        const response = await request(server).post(
          '/v1/events/99/attendees/me'
        )

        // Assert
        expect(response.status).toBe(403)
      })
    })

    describe('when user is already attendee', () => {
      it('should return 400 bad request', async () => {
        // Arrange
        const accessToken = 'BEARER_TOKEN'
        const { event } = await testingEntityService.createTestEvent(
          DEFAULT_USER_ID,
          0,
          [
            {
              userId: DEFAULT_USER_ID,
            },
          ]
        )

        // Act
        const server = app.getHttpServer()
        const response = await request(server)
          .post(`/v1/events/${event.id}/attendees/me`)
          .set('Authorization', `Bearer ${accessToken}`)

        // Assert
        expect(response.status).toBe(400)
        expect(response.body).toStrictEqual({
          message: 'user is already attending',
          status: 400,
        })
      })
    })

    describe('when event is not free', () => {
      it('should call payment service', async () => {
        // Arrange
        const accessToken = 'BEARER_TOKEN'
        const stripeToken = 'some-stripe-token'
        const { event } = await testingEntityService.createTestEvent(
          DEFAULT_USER_ID,
          99
        )
        const input: IPaymentsCreateChargeInput = {
          amount: 99,
          description: `Event registration: ${event.title}`,
          entityId: 1,
          entityType: 'EventEntity',
          stripeToken,
          userId: 1,
        }

        // Act
        const server = app.getHttpServer()
        const response = await request(server)
          .post(`/v1/events/${event.id}/attendees/me`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ stripeToken })

        // Assert
        expect(paymentClientMock.send).toHaveBeenCalledWith(
          PAYMENTS_CREATE_CHARGE_MESSAGE_PATTERN,
          input
        )
        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({
          id: event.id,
          ownerUserId: event.ownerUserId,
          title: event.title,
          description: event.description,
          capacity: event.capacity,
          cost: event.cost,
          attendees: [
            {
              id: expect.any(Number),
              userId: DEFAULT_USER_ID,
            },
          ],
          startsAt: event.startsAt.toISOString(),
        })
      })

      describe('when stripe token is not provided', () => {
        it('should return validation error', async () => {
          // Arrange
          const accessToken = 'BEARER_TOKEN'
          const { event } = await testingEntityService.createTestEvent(
            DEFAULT_USER_ID,
            99
          )

          // Act
          const server = app.getHttpServer()
          const response = await request(server)
            .post(`/v1/events/${event.id}/attendees/me`)
            .set('Authorization', `Bearer ${accessToken}`)

          // Assert
          expect(response.status).toBe(422)
          expect(response.body).toStrictEqual({
            message: 'stripeToken is required',
            status: 422,
          })
        })
      })
    })
  })

  describe('DELETE /events/:id/attendees/me', () => {
    it('should add remove me from attendees', async () => {
      // Arrange
      const accessToken = 'BEARER_TOKEN'
      const { event } = await testingEntityService.createTestEvent(
        DEFAULT_USER_ID,
        0,
        [
          {
            userId: DEFAULT_USER_ID,
          },
        ]
      )

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .delete(`/v1/events/${event.id}/attendees/me`)
        .set('Authorization', `Bearer ${accessToken}`)

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual({
        capacity: event.capacity,
        cost: event.cost,
        description: event.description,
        id: event.id,
        ownerUserId: event.ownerUserId,
        title: event.title,
        startsAt: event.startsAt.toISOString(),
        attendees: [],
      })
    })

    describe('when event is not free', () => {
      it('should call payment service', async () => {
        // Arrange
        const accessToken = 'BEARER_TOKEN'
        const { event } = await testingEntityService.createTestEvent(
          DEFAULT_USER_ID,
          99,
          [
            {
              userId: DEFAULT_USER_ID,
            },
          ]
        )
        const input: IPaymentsRefundChargeInput = {
          entityId: 1,
          entityType: 'EventEntity',
          userId: 1,
        }

        // Act
        const server = app.getHttpServer()
        const response = await request(server)
          .delete(`/v1/events/${event.id}/attendees/me`)
          .set('Authorization', `Bearer ${accessToken}`)

        // Assert
        expect(paymentClientMock.send).toHaveBeenCalledWith(
          PAYMENTS_REFUND_CHARGE_MESSAGE_PATTERN,
          input
        )
        expect(response.status).toBe(200)
        expect(response.body).toStrictEqual({
          capacity: event.capacity,
          cost: event.cost,
          description: event.description,
          id: event.id,
          ownerUserId: event.ownerUserId,
          title: event.title,
          startsAt: event.startsAt.toISOString(),
          attendees: [],
        })
      })
    })
  })

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
              send: () => of({ id: DEFAULT_USER_ID }),
            },
          },
          { provide: PAYMENTS_SERVICE_TOKEN, useValue: paymentClientMock },
        ],
      }
    )

    databaseService = app.get(TestingDatabaseService)
    testingEntityService = app.get(EventTestingService)
  })

  beforeEach(async () => {
    paymentClientMock.send.mockClear()
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.dataSource.destroy()
  })
})
