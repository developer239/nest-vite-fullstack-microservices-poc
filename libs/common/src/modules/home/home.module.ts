import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HomeController } from '@shared/common/modules/home/home.controller'
import { HomeService } from '@shared/common/modules/home/home.service'

@Module({
  imports: [ConfigModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
