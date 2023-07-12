/* eslint-disable max-lines-per-function */
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { WrappedConfigModule } from '@app/auth/modules/config/config.module'
import { DatabaseModule } from '@app/auth/modules/database/database.module'
import { HomeModule } from '@app/auth/modules/home/home.module'
import { bootstrap } from '@shared/common'

describe('[admin] controller', () => {
  let app: INestApplication

  describe('GET /', () => {
    it('should return service name', async () => {
      // Arrange

      // Act
      const server = app.getHttpServer()
      const response = await request(server).get('/')

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual({
        name: 'Auth Microservice',
      })
    })
  })

  // setup

  beforeAll(async () => {
    app = await bootstrap({
      imports: [WrappedConfigModule.forRoot(), DatabaseModule, HomeModule],
    })
  })
})
