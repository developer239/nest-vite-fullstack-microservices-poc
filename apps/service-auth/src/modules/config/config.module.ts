import { Module } from '@nestjs/common'
import {
  appConfig,
  appConfigSchema,
  databaseConfig,
  databaseConfigSchema,
  WrappedConfigModule as ConfigBase,
} from 'backend-shared'

@Module({
  imports: [
    ConfigBase.forRoot(
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
export class WrappedConfigModule {}
