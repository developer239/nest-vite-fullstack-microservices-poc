import { Module } from '@nestjs/common'
import { CommonModule } from '@shared/common'
import { ReservationsController } from './reservations.controller'
import { ReservationsService } from './reservations.service'

@Module({
  imports: [CommonModule],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
