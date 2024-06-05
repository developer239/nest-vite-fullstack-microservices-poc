import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const eventsConfigSchema = {
  AUTH_AMQP_HOST: Joi.number().port(),
  AUTH_AMQP_PORT: Joi.number().port(),
}

export const eventsConfig = registerAs('gateway', () => ({
  authAmqpHost: process.env.AMQP_HOST || 'localhost',
  authAmqpPort: parseInt(process.env.AMQP_PORT!, 10),
}))

export type EventsConfigType = ConfigType<typeof eventsConfig>
