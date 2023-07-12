import { Module } from '@nestjs/common'
import { ReservationsController } from '@app/reservations/reservations.controller'
import { ReservationsService } from '@app/reservations/reservations.service'
import { CommonModule } from '@shared/common'

@Module({
  imports: [CommonModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
