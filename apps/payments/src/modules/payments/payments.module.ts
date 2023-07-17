import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import Stripe from 'stripe'
import { PaymentEntity } from '@app/payments/modules/payments/entities/payment.entity'
import { PaymentRepository } from '@app/payments/modules/payments/entities/payment.repository'
import { PaymentsController } from '@app/payments/modules/payments/payments.controller'
import { PaymentsService } from '@app/payments/modules/payments/payments.service'

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentRepository,
    {
      provide: 'STRIPE',
      useFactory: (configService: ConfigService) => 
        // TODO: use namespaced config
         new Stripe(configService.get('payments.stripeSecretKey')!, {
          apiVersion: '2022-11-15',
        })
      ,
      inject: [ConfigService],
    },
  ],
})
export class PaymentsModule {}
