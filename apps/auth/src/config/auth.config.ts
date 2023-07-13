import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const authConfigSchema = {
  AUTH_JWT_SECRET: Joi.string().required(),
  AUTH_JWT_TOKEN_EXPIRES_IN: Joi.string().required(),
  TCP_PORT: Joi.number().required(),
}

export const authConfig = registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
  tcpPort: process.env.TCP_PORT,
}))

export type AuthConfigType = ConfigType<typeof authConfig>
