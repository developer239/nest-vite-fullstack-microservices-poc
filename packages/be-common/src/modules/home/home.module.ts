import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HomeService } from "./home.service";
import { HomeController } from "./home.controller";

@Module({
  imports: [ConfigModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
