import { ConfigType, registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const paymentsConfigSchema = {
  STRIPE_SECRET_KEY: Joi.string().required(),
}

export const paymentsConfig = registerAs('payments', () => ({
  stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
}))

export type PaymentsConfigType = ConfigType<typeof paymentsConfig>
