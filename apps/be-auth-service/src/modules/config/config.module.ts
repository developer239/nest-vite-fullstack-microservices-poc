import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { appConfig, appConfigSchema } from 'be-common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        ...appConfigSchema,
      }),
    }),
  ],
})
export class WrappedConfigModule {}
