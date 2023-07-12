import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { appConfig, appConfigSchema } from '@shared/common/config/app.config'

@Module({})
export class WrappedConfigModule {
  static forRoot() {
    return {
      module: WrappedConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig],
          envFilePath: ['apps/events/.env'],
          validationSchema: Joi.object({
            ...appConfigSchema,
          }),
        }),
      ],
    }
  }
}
