import { Injectable } from '@nestjs/common'
import { randNumber, randWord } from '@ngneat/falso'
import { PaymentEntity } from '@app/payments/modules/payments/entities/payment.entity'
import { TestingEntityService } from '@shared/common/modules/testing/testing-entity.service'

@Injectable()
export class PaymentTestingService extends TestingEntityService {
  public createPaymentData() {
    return {
      entityId: randNumber({ min: 1, max: 100 }),
      entityType: 'SomeEntity',
      userId: randNumber({ min: 1, max: 100 }),
      amount: randNumber({ min: 1, max: 1000, precision: 0.01 }),
      stripeId: `pi_${randWord()}`,
      status: 'Pending',
    }
  }

  public async createTestPayment() {
    const paymentData = this.createPaymentData()

    const payment = await this.saveFixture(PaymentEntity, paymentData)

    return {
      payment,
      meta: paymentData,
    }
  }

  public async createTestPayments(count: number): Promise<PaymentEntity[]> {
    const payments: PaymentEntity[] = []

    await Promise.all(
      Array(count)
        .fill(0)
        .map(async () => {
          const { payment } = await this.createTestPayment()
          payments.push(payment)
        })
    )

    return payments
  }
}
