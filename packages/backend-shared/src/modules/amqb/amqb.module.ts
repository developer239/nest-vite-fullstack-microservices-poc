// src/modules/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { WrappedConfigModule } from '../config/config.module'
import { appConfig, AppConfigType } from '../../config/app.config'

@Module({})
export class RabbitMQModule {
  static forRoot(port: number) {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'RABBITMQ_SERVICE',
            imports: [WrappedConfigModule],
            inject: [appConfig.KEY],
            useFactory: (config: AppConfigType) => ({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://localhost:${port}`],
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
