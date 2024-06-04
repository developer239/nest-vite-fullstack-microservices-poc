import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const gatewayConfigSchema = {
  AUTH_HTTP_PORT: Joi.number().port().required(),
  AUTH_HOST: Joi.string().required(),
  EVENTS_HTTP_PORT: Joi.number().port().required(),
  EVENTS_HOST: Joi.string().required(),
}

export const gatewayConfig = registerAs('gateway', () => ({
  authHttpPort: process.env.AUTH_HTTP_PORT,
  authHost: process.env.AUTH_HOST,
  eventsHttpPort: process.env.EVENTS_HTTP_PORT,
  eventsHost: process.env.EVENTS_HOST,
}))

export type GatewayConfigType = ConfigType<typeof gatewayConfig>
