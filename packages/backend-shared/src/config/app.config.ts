import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const appConfigSchema = {
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  APP_NAME: Joi.string().required(),
  API_PREFIX: Joi.string().default('api'),
  HTTP_PORT: Joi.number().port().required(),
  AMQP_HOST: Joi.number().port(),
  AMQP_PORT: Joi.number().port(),
}

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  httPort: parseInt(process.env.HTTP_PORT!, 10) || 8080,
  amqpHost: process.env.AMQP_HOST || 'localhost',
  amqpPort: parseInt(process.env.AMQP_PORT!, 10),
  apiPrefix: process.env.API_PREFIX || 'api',
}))

export type AppConfigType = ConfigType<typeof appConfig>
