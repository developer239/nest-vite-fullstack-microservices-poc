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
          appConfig,
          appConfigSchema,
        },
      ]
    ),
  ],
})
export class WrappedConfigModule {}
