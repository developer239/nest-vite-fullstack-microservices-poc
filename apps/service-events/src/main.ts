import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { appConfig, AppConfigType } from 'backend-shared'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const appConfigValues = app.get<AppConfigType>(appConfig.KEY)

  await app.startAllMicroservices()

  await app.listen(appConfigValues.httPort)
  Logger.log(`[NestApplication] Running on port: ${appConfigValues.httPort}`)
}

void bootstrap()
