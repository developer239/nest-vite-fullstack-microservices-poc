import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HomeService } from '@shared/common/modules/home/home.service'

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private readonly service: HomeService) {}

  @Get() appInfo() {
    return this.service.appInfo()
  }
}
