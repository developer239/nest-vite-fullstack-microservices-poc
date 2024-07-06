import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const appConfigSchema = {
  // NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  NODE_ENV: Joi.string(), // development needs to be changed to dev and production to prod because of Terraform
  APP_NAME: Joi.string(),
  API_PREFIX: Joi.string().default('api'),
  PORT: Joi.number().port(),
  AMQP_HOST: Joi.string(),
  AMQP_PORT: Joi.number().port(),
  AMQP_QUEUE_NAME: Joi.string(),
}

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  httPort: parseInt(process.env.PORT!, 10) || 8080,
  amqpHost: process.env.AMQP_HOST || 'localhost',
  amqpPort: parseInt(process.env.AMQP_PORT!, 10),
  amqpQueueName: process.env.AMQP_QUEUE_NAME,
  apiPrefix: process.env.API_PREFIX || 'api',
}))

export type AppConfigType = ConfigType<typeof appConfig>
