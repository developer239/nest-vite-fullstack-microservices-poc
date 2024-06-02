import {
  Module,
} from '@nestjs/common'
import { HomeModule } from "be-common/src/modules/home/home.module";
import { WrappedConfigModule } from "be-events-service/src/modules/config/config.module";

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
  ],
})
export class AppModule {}
