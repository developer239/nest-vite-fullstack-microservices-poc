import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import Stripe from 'stripe'
import {
  paymentsConfig,
  PaymentsConfigType,
} from '@app/payments/config/payments.config'
import { CreateChargeDto } from '@app/payments/modules/payments/dto/create-charge.dto'
import { RefundChargeDto } from '@app/payments/modules/payments/dto/refund-charge.dto'
import { PaymentEntity } from '@app/payments/modules/payments/entities/payment.entity'
import { PaymentRepository } from '@app/payments/modules/payments/entities/payment.repository'

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
    private readonly paymentsConfigValues: PaymentsConfigType,
    private readonly paymentRepository: PaymentRepository
  ) {}

  async createCharge(createChargeDto: CreateChargeDto): Promise<PaymentEntity> {
    const { entityId, entityType, userId, amount, stripeToken } =
      createChargeDto

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method: stripeToken,
        description: `Charge for ${entityType} with id ${entityId}`,
        confirm: true, // Confirm the payment after creating the PaymentIntent
      })

      const payment = new PaymentEntity()
      payment.entityId = entityId
      payment.entityType = entityType
      payment.userId = userId
      payment.amount = amount
      payment.stripeId = paymentIntent.id
      payment.status = 'Completed'

      return await payment.save()
    } catch (error) {
      Logger.error(error)
      throw new HttpException(
        'Payment failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async refundCharge(data: RefundChargeDto) {
    const payment = await this.paymentRepository.findOne(
      data.userId,
      data.entityId,
      data.entityType
    )

    try {
      const result = await this.stripe.refunds.create({
        payment_intent: payment.stripeId,
      })

      return result
    } catch (error) {
      Logger.error(error)
      throw new HttpException('Refund failed', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
