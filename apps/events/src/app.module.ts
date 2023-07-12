import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import * as Joi from 'joi'
import { appConfig, appConfigSchema } from '@app/events/config/app.config'
import { HomeModule } from '@app/events/modules/home/home.module'
import { HttpExceptionFilter, validationOptions } from '@shared/common'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['apps/events/.env'],
      validationSchema: Joi.object({
        ...appConfigSchema,
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
