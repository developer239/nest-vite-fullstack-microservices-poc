import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const eventsConfigSchema = {
  AUTH_AMQP_QUEUE: Joi.string().required(),
}

export const eventsConfig = registerAs('gateway', () => ({
  AUTH_AMQP_QUEUE: process.env.AUTH_AMQP_QUEUE,
}))

export type EventsConfigType = ConfigType<typeof eventsConfig>
