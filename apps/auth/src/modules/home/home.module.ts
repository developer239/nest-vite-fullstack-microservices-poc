import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HomeController } from '@app/auth/modules/home/home.controller'
import { HomeService } from '@app/auth/modules/home/home.service'

@Module({
  imports: [ConfigModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
