import {
  Module,
} from '@nestjs/common'
import { WrappedConfigModule } from "be-auth-service/src/modules/config/config.module";
import { HomeModule } from "be-common/src/modules/home/home.module";

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
  ]
})
export class AppModule {}
