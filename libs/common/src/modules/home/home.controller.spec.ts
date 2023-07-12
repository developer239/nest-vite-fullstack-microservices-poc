import { INestApplication } from '@nestjs/common'
import { ConfigModule, registerAs } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { HomeModule } from '@shared/common/modules/home/home.module'

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
        name: 'Microservice Name',
      })
    })
  })

  // setup

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        HomeModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            registerAs('app', () => ({
              name: 'Microservice Name',
            })),
          ],
        }),
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })
})
