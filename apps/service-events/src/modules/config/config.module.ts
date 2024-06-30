import { Module } from '@nestjs/common'
import {
  appConfig,
  appConfigSchema,
  databaseConfig,
  databaseConfigSchema,
  gpcConfig,
  gpcConfigSchema,
  WrappedConfigModule as BaseConfigModule,
} from 'nest-helpers'
import { eventsConfig, eventsConfigSchema } from 'src/config/events.config'

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
        {
          values: eventsConfig,
          schema: eventsConfigSchema,
        },
        {
          values: gpcConfig,
          schema: gpcConfigSchema,
        },
      ]
    ),
  ],
})
export class ConfigModule {}
