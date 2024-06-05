import { Module } from '@nestjs/common'
import {
  appConfig,
  appConfigSchema,
  databaseConfig,
  databaseConfigSchema,
  WrappedConfigModule as ConfigBase,
} from 'backend-shared'
import { eventsConfig, eventsConfigSchema } from 'src/config/events.config'

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
        {
          values: eventsConfig,
          schema: eventsConfigSchema,
        },
      ]
    ),
  ],
})
export class WrappedConfigModule {}
