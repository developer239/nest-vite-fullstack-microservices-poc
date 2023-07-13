import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const eventsConfigSchema = {
  AUTH_SERVICE_HOST: Joi.string().required(),
  AUTH_SERVICE_TCP_PORT: Joi.number().required(),
}

export const eventsConfig = registerAs('events', () => ({
  authServiceHost: process.env.AUTH_SERVICE_HOST,
  // TODO: use Zod and infer the type from the schema
  authServiceTcpPort: process.env.AUTH_SERVICE_TCP_PORT as unknown as number,
}))

export type EventsConfigType = ConfigType<typeof eventsConfig>
