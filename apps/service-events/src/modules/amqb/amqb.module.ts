import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { AMQP_SERVICE_AUTH } from 'src/constants'
import { eventsConfig, EventsConfigType } from 'src/config/events.config'
import { appConfig, AppConfigType } from 'backend-shared'

@Module({})
export class RabbitMQModule {
  static forRoot() {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: AMQP_SERVICE_AUTH,
            imports: [WrappedConfigModule],
            inject: [appConfig.KEY, eventsConfig.KEY],
            useFactory: (
              appConfig: AppConfigType,
              eventsConfig: EventsConfigType
            ) => ({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${appConfig.amqpHost}:${appConfig.amqpPort}`],
                queue: eventsConfig.AUTH_AMQP_QUEUE,
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
