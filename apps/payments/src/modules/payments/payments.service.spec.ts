/* eslint-disable max-lines-per-function */
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
      const description = `Charge for ${data.entityType} with id ${data.entityId}`

      // Act
      const payment = await service.createCharge({
        ...data,
        stripeToken: data.stripeId,
        description,
      })

      // Assert
      expect(payment.stripeId).toBe('mockPaymentIntentId')
      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: data.amount,
        currency: 'usd',
        payment_method: data.stripeId,
        description,
        confirm: true,
        metadata: {
          entityId: payment.entityId.toString(),
          entityType: payment.entityType,
        },
      })
    })

    describe('when payment for entity already exists', () => {
      it('should throw an error', async () => {
        // Arrange
        const { payment } = await testingEntityService.createTestPayment()
        const DTO = {
          description: 'some description',
          entityId: payment.entityId,
          entityType: payment.entityType,
          userId: payment.userId,
          amount: payment.amount,
          stripeToken: payment.stripeId,
        }

        // Act
        try {
          await service.createCharge(DTO)
          throw new Error(
            'should not create a payment if within constraints already exists'
          )
        } catch (error) {
          // Assert
          expect(error.message).toStrictEqual('Payment failed')
        }
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
      const response = await service.refundCharge(dto)

      // Assert
      expect(response.refund.id).toBe('mockRefundId')
      expect(response.payment.isRefunded).toBe(true)
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
