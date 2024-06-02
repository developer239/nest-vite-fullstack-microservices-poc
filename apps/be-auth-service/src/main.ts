import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { appConfig, AppConfigType } from 'be-common'
import { AppModule } from 'src/app.module'

// TODO: generalize and move to shared
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const appConfigValues = app.get<AppConfigType>(appConfig.KEY)

  await app.startAllMicroservices()

  await app.listen(appConfigValues.httPort)
  Logger.log(`[NestApplication] Running on port: ${appConfigValues.httPort}`)
}

void bootstrap()
