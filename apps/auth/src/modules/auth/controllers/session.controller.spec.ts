/* eslint-disable max-lines-per-function, max-lines */
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as request from 'supertest'
import { AuthModule } from '@app/auth/modules/auth/auth.module'
import { RefreshToken } from '@app/auth/modules/auth/entities/refresh-token.entity'
import { UserTestingService } from '@app/auth/modules/auth/entities/user-testing.service'
import { WrappedConfigModule } from '@app/auth/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/auth/modules/database/database.module'
import { TestingDatabaseService } from '@shared/common/modules/testing/testing-database.service'
import { bootstrap } from '@shared/common/modules/testing/utilities'

describe('[session] controller', () => {
  let app: INestApplication
  let databaseService: TestingDatabaseService
  let testingEntityService: UserTestingService
  let jwtService: JwtService

  describe('POST /email', () => {
    it('should find user by credentials', async () => {
      // Arrange
      const { user, meta } = await testingEntityService.createTestUser()

      // Act
      const server = app.getHttpServer()
      const response = await request(server).post('/v1/session/email').send({
        email: user.email,
        password: meta.plainPassword,
      })

      // Assert
      expect(response.status).toBe(201)
      expect(response.body).toStrictEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      })
    })

    describe('when user does not exist', () => {
      it('should return 401 Unauthorized', async () => {
        // Arrange
        const user = testingEntityService.createUserData()

        // Act
        const server = app.getHttpServer()
        const response = await request(server).post('/v1/session/email').send({
          email: user.email,
          password: user.password,
        })

        // Assert
        expect(response.status).toBe(401)
      })
    })

    describe('when password is incorrect', () => {
      it('should return 401 Unauthorized', async () => {
        // Arrange
        const { user } = await testingEntityService.createTestUser()

        // Act
        const server = app.getHttpServer()
        const response = await request(server).post('/v1/session/email').send({
          email: user.email,
          password: 'wrong-password',
        })

        // Assert
        expect(response.status).toBe(401)
      })
    })
  })

  describe('POST /refresh', () => {
    it('should return access token', async () => {
      // Arrange
      const { user, accessToken: token } =
        await testingEntityService.createAuthenticatedUser(jwtService)
      const refreshToken = await testingEntityService.saveFixture(
        RefreshToken,
        {
          value: token,
          user: {
            id: user.id,
          },
        }
      )

      // Act
      const server = app.getHttpServer()
      const response = await request(server).post('/v1/session/refresh').send({
        refreshToken: refreshToken.value,
      })

      // Assert
      expect(response.status).toBe(201)
      expect(response.body).toMatchObject({
        accessToken: expect.any(String),
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
