import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { appConfig, AppConfigType } from '../../config/app.config'

export const bootstrap = async (appModule: any) => {
  const app = await NestFactory.create(appModule, { cors: true })
  app.enableShutdownHooks()

  const appConfigValues = app.get<AppConfigType>(appConfig.KEY)

  if (appConfigValues.tcpPort) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        // TODO: pass host from env
        urls: [`amqp://localhost:${appConfigValues.tcpPort}`],
        queue: 'some_queue',
        queueOptions: {
          durable: false,
        },
      },
    })
    Logger.log(
      `[NestApplication] Registering microservice on port: ${appConfigValues.tcpPort}`
    )

    await app.startAllMicroservices()
  }

  await app.listen(appConfigValues.httPort)
  Logger.log(`[NestApplication] Running on port: ${appConfigValues.httPort}`)
}
