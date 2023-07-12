import { Inject, Injectable } from '@nestjs/common'
import { appConfig, AppConfigType } from '@shared/common/config/app.config'

@Injectable()
export class HomeService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfigValues: AppConfigType
  ) {}

  appInfo() {
    return { name: this.appConfigValues.name }
  }
}
