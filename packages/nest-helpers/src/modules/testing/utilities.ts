import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { Test, TestingModuleBuilder } from '@nestjs/testing'
import * as Joi from 'joi'
import { appConfig, appConfigSchema } from '../../config/app.config'
import {
  databaseConfig,
  databaseConfigSchema,
} from '../../config/database.config'
import { DatabaseModule } from '../database/database.module'
import { TestingModule } from './testing.module'

export const bootstrap = async (
  metadata: ModuleMetadata,
  override?: (moduleBuilder: TestingModuleBuilder) => TestingModuleBuilder
) => {
  let testingModule = Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [databaseConfig, appConfig],
        envFilePath: ['.env.test', '.env'],
        validationSchema: Joi.object({
          ...appConfigSchema,
          ...databaseConfigSchema,
        }),
      }),
      DatabaseModule,
      TestingModule,
      ...(metadata.imports ? metadata.imports : []),
    ],
    controllers: [...(metadata?.controllers ?? [])],
    providers: [
      ...(metadata?.providers ?? []),
      {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
          // TODO: define testing validation options
        }),
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor,
      },
    ],
    exports: [...(metadata?.exports ?? [])],
  })

  if (override) {
    testingModule = override(testingModule)
  }

  const app = (await testingModule.compile()).createNestApplication()

  // TODO: possible use firebase module?
  // useContainer(app.select(AuthModule), { fallbackOnErrors: true })

  app.setGlobalPrefix(app.get(ConfigService).get('app.apiPrefix')!, {
    exclude: ['/'],
  })
  app.enableVersioning({
    type: VersioningType.URI,
  })

  await app.init()

  return app
}
