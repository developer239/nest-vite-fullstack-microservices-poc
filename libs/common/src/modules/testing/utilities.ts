import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import { TestingModule } from '@shared/common/modules/testing/testing.module'
import { validationOptions } from '@shared/common/utils/validation-options'

export const bootstrap = async (metadata: ModuleMetadata) => {
  const app = (
    await Test.createTestingModule({
      imports: [TestingModule, ...(metadata.imports ? metadata.imports : [])],
      controllers: [...(metadata?.controllers ?? [])],
      providers: [
        ...(metadata?.providers ?? []),
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(validationOptions),
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
      ],
      exports: [...(metadata?.exports ?? [])],
    }).compile()
  ).createNestApplication()

  app.enableVersioning({
    type: VersioningType.URI,
  })

  await app.init()

  return app
}
