import { Test, TestingModule as NestTestingModule } from '@nestjs/testing'
import Stripe from 'stripe'
import { WrappedConfigModule } from '@app/payments/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/payments/modules/database/database.module'
import { RefundChargeDto } from '@app/payments/modules/payments/dto/refund-charge.dto'
import { PaymentTestingService } from '@app/payments/modules/payments/entities/payment-testing.service'
import { PaymentsModule } from '@app/payments/modules/payments/payments.module'
import { PaymentsService } from '@app/payments/modules/payments/payments.service'
import { TestingDatabaseService } from '@shared/common/modules/testing/testing-database.service'
import { TestingModule } from '@shared/common/modules/testing/testing.module'

describe('[payments] PaymentsService', () => {
  let databaseService: TestingDatabaseService
  let testingEntityService: PaymentTestingService
  let service: PaymentsService
  let mockStripe: jest.Mocked<Stripe>

  describe('createCharge', () => {
    it('should create a charge', async () => {
      // Arrange
      const data = testingEntityService.createPaymentData()

      // Act
      const payment = await service.createCharge({
        ...data,
        stripeToken: data.stripeId,
      })

      // Assert
      expect(payment.stripeId).toBe('mockPaymentIntentId')
      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: data.amount,
        currency: 'usd',
        payment_method: data.stripeId,
        description: `Charge for ${data.entityType} with id ${data.entityId}`,
        confirm: true,
      })
    })
  })

  describe('refundCharge', () => {
    it('should create a refund', async () => {
      // Arrange
      const { payment } = await testingEntityService.createTestPayment()
      const dto: RefundChargeDto = {
        userId: payment.userId,
        entityId: payment.entityId,
        entityType: payment.entityType,
      }

      // Act
      const refund = await service.refundCharge(dto)

      // Assert
      expect(refund.id).toBe('mockRefundId')
      expect(mockStripe.refunds.create).toHaveBeenCalledWith({
        payment_intent: payment.stripeId,
      })
    })
  })

  //
  //
  // setup

  beforeAll(async () => {
    mockStripe = {
      paymentIntents: {
        create: jest.fn().mockResolvedValue({ id: 'mockPaymentIntentId' }),
      },
      refunds: {
        create: jest.fn().mockResolvedValue({ id: 'mockRefundId' }),
      },
    } as any

    const module: NestTestingModule = await Test.createTestingModule({
      imports: [
        TestingModule,
        WrappedConfigModule,
        WrappedDatabaseModule,
        PaymentsModule,
      ],
      providers: [PaymentTestingService],
    })
      .overrideProvider('STRIPE')
      .useValue(mockStripe)
      .compile()

    databaseService = module.get(TestingDatabaseService)
    service = module.get<PaymentsService>(PaymentsService)
    testingEntityService = module.get(PaymentTestingService)
  })

  beforeEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.dataSource.destroy()
  })
})
