import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HomeController } from './home.controller'
import { HomeService } from './home.service'

@Module({
  imports: [ConfigModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
