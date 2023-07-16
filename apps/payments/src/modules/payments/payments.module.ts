import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentEntity } from '@app/payments/modules/payments/entities/payment.entity'
import { PaymentRepository } from '@app/payments/modules/payments/entities/payment.repository'
import { PaymentsController } from '@app/payments/modules/payments/payments.controller'
import { PaymentsService } from '@app/payments/modules/payments/payments.service'

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentRepository],
})
export class PaymentsModule {}
