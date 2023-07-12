import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import * as Joi from 'joi'
import { appConfig, appConfigSchema } from '@app/auth/config/app.config'
import { authConfig, authConfigSchema } from '@app/auth/config/auth.config'
import { HomeModule } from '@app/auth/modules/home/home.module'
import { HttpExceptionFilter, validationOptions } from '@shared/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
      envFilePath: ['apps/auth/.env'],
      validationSchema: Joi.object({
        ...appConfigSchema,
        ...authConfigSchema,
      }),
    }),
    HomeModule,
  ],
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
