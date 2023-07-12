import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const appConfigSchema = {
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  APP_NAME: Joi.string().required(),
  API_PREFIX: Joi.string().default('api'),
  PORT: Joi.number().port().required(),
}

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  port: parseInt((process.env.PORT || process.env.PORT)!, 10) || 8080,
  apiPrefix: process.env.API_PREFIX || 'api',
}))

export type AppConfigType = ConfigType<typeof appConfig>
