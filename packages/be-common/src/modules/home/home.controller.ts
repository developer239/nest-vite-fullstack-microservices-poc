import { Controller, Get } from '@nestjs/common'
import { HomeService } from "be-common/src/modules/home/home.service";

@Controller()
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get() appInfo() {
    return this.service.appInfo()
  }
}
