/* eslint-disable max-lines-per-function, max-lines */
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { useContainer } from 'class-validator'
import * as request from 'supertest'
import { AuthModule } from '@app/auth/modules/auth/auth.module'
import { UserTestingService } from '@app/auth/modules/auth/entities/user-testing.service'
import { WrappedConfigModule } from '@app/auth/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/auth/modules/database/database.module'
import { TestingDatabaseService } from '@shared/common/modules/testing/testing-database.service'
import { bootstrap } from '@shared/common/modules/testing/utilities'

describe('[users] controller', () => {
  let app: INestApplication
  let databaseService: TestingDatabaseService
  let testingEntityService: UserTestingService
  let jwtService: JwtService

  describe('GET /', () => {
    it('should return a list of users', async () => {
      // Arrange
      const { user: user1 } = await testingEntityService.createTestUser()
      const { user: user2 } = await testingEntityService.createTestUser()
      const { user: user3 } = await testingEntityService.createTestUser()
      const ids = [user1.id, user2.id, user3.id]

      // Act
      const server = app.getHttpServer()
      const response = await request(server).get('/v1/users').query({ ids })

      // Assert
      expect(response.status).toStrictEqual(200)
      expect(response.body).toHaveLength(3)
      expect(response.body).toStrictEqual([
        {
          id: user1.id,
          firstName: user1.firstName,
          lastName: user1.lastName,
        },
        {
          id: user2.id,
          firstName: user2.firstName,
          lastName: user2.lastName,
        },
        {
          id: user3.id,
          firstName: user3.firstName,
          lastName: user3.lastName,
        },
      ])
    })

    describe('when non-existing ids are provided', () => {
      it('should return an empty list', async () => {
        // Arrange
        const ids = [9999, 8888]

        // Act
        const server = app.getHttpServer()
        const response = await request(server).get('/v1/users').query({ ids })

        // Assert
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
      })
    })
  })

  describe('POST /', () => {
    it('should register a new user', async () => {
      // Arrange
      const data = testingEntityService.createUserData()

      // Act
      const server = app.getHttpServer()
      const response = await request(server).post('/v1/users').send(data)

      // Assert
      expect(response.status).toBe(201)
    })

    describe('when user already exists', () => {
      it('should return 400 status code', async () => {
        // Arrange
        const {
          user: { email, password },
        } = await testingEntityService.createTestUser()

        // Act
        const server = app.getHttpServer()
        const response = await request(server).post('/v1/users').send({
          email,
          password,
        })

        // Assert
        expect(response.status).toBe(422)
      })
    })
  })

  describe('GET /me', () => {
    it('should return the current user', async () => {
      // Arrange
      const { user, accessToken } =
        await testingEntityService.createAuthenticatedUser(jwtService)

      // Act
      const server = app.getHttpServer()
      const response = await request(server)
        .get('/v1/users/me')
        .set('Authorization', `Bearer ${accessToken}`)

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    })

    describe('when invalid access token', () => {
      it('should return 401 status code', async () => {
        // Act
        const server = app.getHttpServer()
        const response = await request(server).get('/v1/users/me')

        // Assert
        expect(response.status).toBe(401)
      })
    })
  })

  //
  //
  // setup

  beforeAll(async () => {
    app = await bootstrap({
      imports: [WrappedConfigModule, WrappedDatabaseModule, AuthModule],
      providers: [UserTestingService],
    })

    // Note: this provides data source to the class-validator
    useContainer(app.select(AuthModule), { fallbackOnErrors: true })

    databaseService = app.get(TestingDatabaseService)
    testingEntityService = app.get(UserTestingService)
    jwtService = app.get(JwtService)
  })

  beforeEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.dataSource.destroy()
  })
})
