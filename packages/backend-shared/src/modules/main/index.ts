import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { appConfig, AppConfigType } from '../../config/app.config'

export const bootstrap = async (appModule: any) => {
  const app = await NestFactory.create(appModule, { cors: true })
  app.enableShutdownHooks()

  const appConfigValues = app.get<AppConfigType>(appConfig.KEY)

  if (
    appConfigValues.amqpQueueName &&
    appConfigValues.amqpHost &&
    appConfigValues.amqpPort
  ) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${appConfigValues.amqpHost}:${appConfigValues.amqpPort}`,
        ],
        queue: appConfigValues.amqpQueueName,
        queueOptions: {
          durable: false,
        },
      },
    })
    Logger.log(
      `\x1b[34m [NestApplication] Registering microservice on port: ${appConfigValues.amqpPort} \x1b[34m`
    )

    await app.startAllMicroservices()
  }

  await app.listen(appConfigValues.httPort)
  Logger.log(
    `\x1b[34m [NestApplication] Running on port: ${appConfigValues.httPort} \x1b[34m`
  )
}
