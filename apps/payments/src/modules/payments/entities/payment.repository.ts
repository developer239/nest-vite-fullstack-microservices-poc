import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaymentEntity } from '@app/payments/modules/payments/entities/payment.entity'

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentEntityRepository: Repository<PaymentEntity>
  ) {}

  findOne(userId: number, entityId: number, entityType: string) {
    return this.paymentEntityRepository.findOneOrFail({
      where: {
        userId,
        entityId,
        entityType,
        isRefunded: false,
      },
    })
  }
}
