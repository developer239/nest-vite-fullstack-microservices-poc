import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { RABBITMQ_SERVICE } from 'src/constants'
import { eventsConfig, EventsConfigType } from 'src/config/events.config'

@Module({})
export class RabbitMQModule {
  static forRoot() {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: RABBITMQ_SERVICE,
            imports: [WrappedConfigModule],
            inject: [eventsConfig.KEY],
            useFactory: (config: EventsConfigType) => ({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${config.authAmqpHost}:${config.authAmqpPort}`],
                queue: 'rpc_queue',
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
