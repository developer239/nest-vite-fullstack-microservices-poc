import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { authConfig, authConfigSchema } from '@app/auth/config/auth.config'
import { appConfig, appConfigSchema } from '@shared/common/config/app.config'
import {
  databaseConfig,
  databaseConfigSchema,
} from '@shared/common/config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig],
      envFilePath: ['apps/auth/.env'],
      validationSchema: Joi.object({
        ...appConfigSchema,
        ...authConfigSchema,
        ...databaseConfigSchema,
      }),
    }),
  ],
})
export class WrappedConfigModule {}
