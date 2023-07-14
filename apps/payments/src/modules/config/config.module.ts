import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import {
  paymentsConfig,
  paymentsConfigSchema,
} from '@app/payments/config/payments.config'
import { appConfig, appConfigSchema } from '@shared/common/config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, paymentsConfig],
      envFilePath: ['apps/payments/.env'],
      validationSchema: Joi.object({
        ...appConfigSchema,
        ...paymentsConfigSchema,
      }),
    }),
  ],
})
export class WrappedConfigModule {}
