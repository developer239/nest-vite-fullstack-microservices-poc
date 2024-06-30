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
          values: gpcConfig,
          schema: gpcConfigSchema,
        },
      ]
    ),
  ],
})
export class ConfigModule {}
