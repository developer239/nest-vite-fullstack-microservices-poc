import { Module } from '@nestjs/common'
import { ConfigFactory } from '@nestjs/config/dist/interfaces/config-factory.interface'
import * as Joi from 'joi'
import { ConfigModule } from '@nestjs/config'

@Module({})
export class WrappedConfigModule {
  static forRoot(
    envFilePath: string[],
    configs: {
      appConfig: ConfigFactory
      appConfigSchema: { [key: string]: Joi.Schema }
    }[],
    isGlobal = true
  ) {
    return {
      module: WrappedConfigModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal,
          load: configs.map((config) => config.appConfig),
          envFilePath,
          validationSchema: Joi.object(
            configs.reduce(
              (acc, config) => ({
                ...acc,
                ...config.appConfigSchema,
              }),
              {}
            )
          ),
        }),
      ],
    }
  }
}
