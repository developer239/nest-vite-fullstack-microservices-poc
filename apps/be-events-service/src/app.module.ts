import { Module } from '@nestjs/common'
import { HomeModule } from 'backend-shared'
import { WrappedConfigModule } from 'src/modules/config/config.module'

@Module({
  imports: [WrappedConfigModule, HomeModule],
})
export class AppModule {}
