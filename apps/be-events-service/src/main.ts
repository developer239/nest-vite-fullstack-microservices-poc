import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from "be-events-service/src/app.module";
import { appConfig, AppConfigType } from "be-common/src/config/app.config";

// TODO: generalize and move to shared
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  const appConfigValues = app.get<AppConfigType>(appConfig.KEY)

  await app.startAllMicroservices()

  await app.listen(appConfigValues.httPort)
  Logger.log(`[NestApplication] Running on port: ${appConfigValues.httPort}`)
}

void bootstrap()
