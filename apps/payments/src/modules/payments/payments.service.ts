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
      const charge = await this.stripe.charges.create({
        amount,
        currency: 'usd',
        source: stripeToken,
        description: `Charge for ${entityType} with id ${entityId}`,
      })

      const payment = new PaymentEntity()
      payment.entityId = entityId
      payment.entityType = entityType
      payment.userId = userId
      payment.amount = amount
      payment.stripeId = charge.id
      payment.status = 'Completed'

      return await payment.save()
    } catch (error) {
      Logger.error(error)
      throw new HttpException('Payment failed', HttpStatus.BAD_REQUEST)
    }
  }

  async refundCharge(
    data: RefundChargeDto
  ): Promise<Stripe.Response<Stripe.Refund>> {
    const payment = await this.paymentRepository.findOne(
      data.userId,
      data.entityId,
      data.entityType
    )

    return this.stripe.refunds.create({
      charge: payment.stripeId,
      amount: Math.round(payment.amount),
    })
  }
}
