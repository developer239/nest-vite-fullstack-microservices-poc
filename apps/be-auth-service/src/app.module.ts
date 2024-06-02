import {
  Module,
} from '@nestjs/common'
import { HomeModule } from "be-common";
import { WrappedConfigModule } from "src/modules/config/config.module";

@Module({
  imports: [
    WrappedConfigModule,
    HomeModule,
  ]
})
export class AppModule {}
