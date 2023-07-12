import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { WrappedConfigModule } from '@app/auth/modules/config/config.module'
import { HomeModule } from '@app/auth/modules/home/home.module'
import { HttpExceptionFilter, validationOptions } from '@shared/common'

@Module({
  imports: [WrappedConfigModule.forRoot(), HomeModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(validationOptions),
    },
    {
      provide: APP_FILTER,
      useValue: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
