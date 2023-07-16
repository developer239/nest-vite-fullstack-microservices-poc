import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import {
  paymentsConfig,
  paymentsConfigSchema,
} from '@app/payments/config/payments.config'
import { appConfig, appConfigSchema } from '@shared/common/config/app.config'
import {
  databaseConfig,
  databaseConfigSchema,
} from '@shared/common/config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, paymentsConfig],
      envFilePath: ['apps/payments/.env'],
      validationSchema: Joi.object({
        ...appConfigSchema,
        ...databaseConfigSchema,
        ...paymentsConfigSchema,
      }),
    }),
  ],
})
export class WrappedConfigModule {}
