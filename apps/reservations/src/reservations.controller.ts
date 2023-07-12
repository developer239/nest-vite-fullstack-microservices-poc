import { Controller, Get } from '@nestjs/common'
import { CommonService } from '@shared/common'

@Controller()
export class ReservationsController {
  constructor(private readonly service: CommonService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }
}
