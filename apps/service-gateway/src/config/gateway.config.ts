import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const gatewayConfigSchema = {
  AUTH_URL: Joi.string().uri().required(),
  EVENTS_URL: Joi.string().uri().required(),
}

export const gatewayConfig = registerAs('gateway', () => ({
  authUrl: process.env.AUTH_URL,
  eventsUrl: process.env.EVENTS_URL,
}))

export type GatewayConfigType = ConfigType<typeof gatewayConfig>
