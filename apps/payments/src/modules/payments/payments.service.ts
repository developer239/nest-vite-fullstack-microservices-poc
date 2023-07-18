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
import {
  PaymentEntity,
  PaymentStatus,
} from '@app/payments/modules/payments/entities/payment.entity'
import { PaymentRepository } from '@app/payments/modules/payments/entities/payment.repository'

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(paymentsConfig.KEY)
    private readonly paymentsConfigValues: PaymentsConfigType,
    private readonly paymentRepository: PaymentRepository,
    @Inject('STRIPE') private readonly stripe: Stripe
  ) {}

  async createCharge(createChargeDto: CreateChargeDto): Promise<PaymentEntity> {
    const { description, entityId, entityType, userId, amount, stripeToken } =
      createChargeDto

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method: stripeToken,
        description,
        confirm: true,
        metadata: {
          entityId: entityId.toString(),
          entityType,
        },
      })

      const payment = new PaymentEntity()
      payment.entityId = entityId
      payment.entityType = entityType
      payment.userId = userId
      payment.amount = amount
      payment.stripeId = paymentIntent.id
      payment.status = PaymentStatus.COMPLETED

      return await payment.save()
    } catch (error) {
      Logger.error('[PaymentsService] An error occurred:', error)
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
      const refund = await this.stripe.refunds.create({
        payment_intent: payment.stripeId,
      })

      payment.isRefunded = true
      await payment.save()

      return { refund, payment }
    } catch (error) {
      Logger.error('[PaymentsService] An error occurred:', error)
      throw new HttpException('Refund failed', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
