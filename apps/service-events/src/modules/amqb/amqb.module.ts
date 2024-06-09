import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { appConfig, AppConfigType } from 'backend-shared'
import { eventsConfig, EventsConfigType } from 'src/config/events.config'
import { AMQP_SERVICE_AUTH } from 'src/constants'
import { ConfigModule } from 'src/modules/config/config.module'

@Module({})
export class RabbitMQModule {
  static forRoot() {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: AMQP_SERVICE_AUTH,
            imports: [ConfigModule],
            inject: [appConfig.KEY, eventsConfig.KEY],
            useFactory: (
              injectedAppConfig: AppConfigType,
              injectedEventsConfig: EventsConfigType
            ) => ({
              transport: Transport.RMQ,
              options: {
                urls: [
                  `amqp://${injectedAppConfig.amqpHost}:${injectedAppConfig.amqpPort}`,
                ],
                queue: injectedEventsConfig.AUTH_AMQP_QUEUE,
                queueOptions: {
                  durable: false,
                },
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    }
  }
}
