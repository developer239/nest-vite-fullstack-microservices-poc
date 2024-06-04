import { Module } from '@nestjs/common'
import {
  appConfig,
  appConfigSchema,
  WrappedConfigModule as ConfigBase,
} from 'backend-shared'
import { gatewayConfig, gatewayConfigSchema } from 'src/config/gateway.config'

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
          values: gatewayConfig,
          schema: gatewayConfigSchema,
        },
      ]
    ),
  ],
})
export class WrappedConfigModule {}
