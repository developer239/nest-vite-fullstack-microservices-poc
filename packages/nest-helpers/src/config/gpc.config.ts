import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const gpcConfigSchema = {
  GCP_AUTH_SA_KEY: Joi.string(),
}

export const gpcConfig = registerAs('gpc', () => ({
  gcpGpcSaKey: process.env.GCP_AUTH_SA_KEY!,
}))

export type GpcConfigType = ConfigType<typeof gpcConfig>
