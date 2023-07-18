export const PAYMENTS_CREATE_CHARGE_MESSAGE_PATTERN = 'PAYMENTS_CREATE_CHARGE'

export interface IPaymentsCreateChargeInput {
  entityId: number
  entityType: string
  userId: number
  amount: number
  stripeToken: string
  description: string
}

export const PAYMENTS_REFUND_CHARGE_MESSAGE_PATTERN = 'PAYMENTS_REFUND_CHARGE'

export interface IPaymentsRefundChargeInput {
  entityId: number
  entityType: string
  userId: number
}
