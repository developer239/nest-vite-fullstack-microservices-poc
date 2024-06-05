import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { WrappedConfigModule } from 'src/modules/config/config.module'
import { appConfig, AppConfigType } from 'backend-shared'
import { RABBITMQ_SERVICE } from 'src/constants'

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
            inject: [appConfig.KEY],
            useFactory: (config: AppConfigType) => ({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${config.amqpHost}:${config.amqpPort}`],
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