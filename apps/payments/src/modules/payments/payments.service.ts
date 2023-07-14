import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import {
  paymentsConfig,
  PaymentsConfigType,
} from '@app/payments/config/payments.config'
import { CreateChargeDto } from '@app/payments/modules/payments/dto/create-charge.dto'

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.paymentsConfigValues.stripeSecretKey,
    {
      apiVersion: '2022-11-15',
    }
  )

  constructor(
    @Inject(paymentsConfig.KEY)
    private readonly paymentsConfigValues: PaymentsConfigType
  ) {}

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: card.number,
        exp_month: card.expMonth,
        exp_year: card.expYear,
        cvc: card.cvc,
      },
    })

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    })

    return paymentIntent
  }
}
