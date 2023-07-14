import { ConfigType, registerAs } from '@nestjs/config'

export const paymentsConfigSchema = {}

export const paymentsConfig = registerAs('payments', () => ({}))

export type PaymentsConfigType = ConfigType<typeof paymentsConfig>
