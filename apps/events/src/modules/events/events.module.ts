import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  eventsConfig,
  EventsConfigType,
} from '@app/events/config/events.config'
import { AttendeeEntity } from '@app/events/modules/events/entities/attendee.entity'
import { EventEntity } from '@app/events/modules/events/entities/event.entity'
import { EventsRepository } from '@app/events/modules/events/entities/events.repository'
import { EventsController } from '@app/events/modules/events/events.controller'
import { EventsService } from '@app/events/modules/events/events.service'
import { AuthServiceJwtStrategy } from '@shared/common/modules/auth/strategies/auth-service-jwt.strategy'
import {
  AUTH_SERVICE_TOKEN,
  PAYMENTS_SERVICE_TOKEN,
} from '@shared/common/tokens'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_TOKEN,
        imports: [ConfigModule],
        inject: [eventsConfig.KEY],
        useFactory: (config: EventsConfigType) => ({
          transport: Transport.TCP,
          options: {
            host: config.authServiceHost,
            port: config.authServiceTcpPort,
          },
        }),
      },
      {
        name: PAYMENTS_SERVICE_TOKEN,
        imports: [ConfigModule],
        inject: [eventsConfig.KEY],
        useFactory: (config: EventsConfigType) => ({
          transport: Transport.TCP,
          options: {
            host: config.paymentsServiceHost,
            port: config.paymentsServiceTcpPort,
          },
        }),
      },
    ]),
    TypeOrmModule.forFeature([EventEntity, AttendeeEntity]),
  ],
  controllers: [EventsController],
  providers: [EventsRepository, EventsService, AuthServiceJwtStrategy],
  exports: [],
})
export class EventsModule {}
