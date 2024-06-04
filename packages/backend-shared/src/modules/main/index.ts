import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { useContainer } from 'class-validator'
import { appConfig, AppConfigType } from '../config/app.config'

export const bootstrap = async (appModule: any) => {
  const app = await NestFactory.create(appModule, { cors: true })
  app.enableShutdownHooks()

  useContainer(app.select(appModule), { fallbackOnErrors: true })

  const appConfigValues = app.get<AppConfigType>(appConfig.KEY)

  if (appConfigValues.tcpPort) {
    app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: appConfigValues.tcpPort,
      },
    })
  }

  await app.startAllMicroservices()

  await app.listen(appConfigValues.httPort)
  Logger.log(`[NestApplication] Running on port: ${appConfigValues.httPort}`)
}
