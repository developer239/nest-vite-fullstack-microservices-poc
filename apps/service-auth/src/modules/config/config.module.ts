import { Module } from '@nestjs/common'
import {
  appConfig,
  appConfigSchema,
  databaseConfig,
  databaseConfigSchema,
  WrappedConfigModule as BaseConfigModule,
} from 'backend-shared'

@Module({
  imports: [
    BaseConfigModule.forRoot(
      ['.env'],
      [
        {
          values: appConfig,
          schema: appConfigSchema,
        },
        {
          values: databaseConfig,
          schema: databaseConfigSchema,
        },
      ]
    ),
  ],
})
export class ConfigModule {}
