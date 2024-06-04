import { Module } from '@nestjs/common'
import {
  appConfig,
  appConfigSchema,
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
      ]
    ),
  ],
})
export class WrappedConfigModule {}
