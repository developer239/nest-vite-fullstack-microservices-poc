import { Test, TestingModule } from '@nestjs/testing'
import Stripe from 'stripe'
import { WrappedConfigModule } from '@app/payments/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/payments/modules/database/database.module'
import { CreateChargeDto } from '@app/payments/modules/payments/dto/create-charge.dto'
import { RefundChargeDto } from '@app/payments/modules/payments/dto/refund-charge.dto'
import { PaymentsModule } from '@app/payments/modules/payments/payments.module'
import { PaymentsService } from '@app/payments/modules/payments/payments.service'

// TODO: refactor and implement proper tests
describe('PaymentsService', () => {
  let service: PaymentsService
  let mockStripe: jest.Mocked<Stripe>

  it('should create a charge', async () => {
    const dto: CreateChargeDto = {
      entityId: 1,
      entityType: 'testEntity',
      userId: 2,
      amount: 100,
      stripeToken: 'tok_test',
    }

    const payment = await service.createCharge(dto)

    expect(payment.stripeId).toBe('mockPaymentIntentId')
    expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith({
      amount: dto.amount,
      currency: 'usd',
      payment_method: dto.stripeToken,
      description: `Charge for ${dto.entityType} with id ${dto.entityId}`,
      confirm: true,
    })
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should create a refund', async () => {
    // create mock entity after you create payment test helper

    const dto: RefundChargeDto = {
      userId: 1,
      entityId: 3,
      entityType: 'EventEntity',
    }

    const refund = await service.refundCharge(dto)

    expect(refund.id).toBe('mockRefundId')
    expect(mockStripe.refunds.create).toHaveBeenCalledWith({
      payment_intent: 'mockStripeId',
    })
  })

  beforeEach(async () => {
    mockStripe = {
      paymentIntents: {
        create: jest.fn().mockResolvedValue({ id: 'mockPaymentIntentId' }),
      },
      refunds: {
        create: jest.fn().mockResolvedValue({ id: 'mockRefundId' }),
      },
    } as any

    const module: TestingModule = await Test.createTestingModule({
      imports: [WrappedConfigModule, WrappedDatabaseModule, PaymentsModule],
    })
      .overrideProvider('STRIPE')
      .useValue(mockStripe)
      .compile()

    service = module.get<PaymentsService>(PaymentsService)
  })
})
