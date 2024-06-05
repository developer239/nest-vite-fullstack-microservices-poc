import { Module } from '@nestjs/common'
import { GraphQLModule as BaseGraphQLModule } from '@nestjs/graphql'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from 'src/modules/config/config.module'
import { gatewayConfig, GatewayConfigType } from 'src/config/gateway.config'
import { ApolloComplexityPlugin } from 'backend-shared'
import { IntrospectAndCompose } from '@apollo/gateway'

@Module({
  imports: [
    BaseGraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      imports: [ConfigModule],
      inject: [gatewayConfig.KEY],
      useFactory: (config: GatewayConfigType) => ({
        server: {
          plugins: [new ApolloComplexityPlugin(50)],
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'auth',
                url: `http://${config.authHost}:${config.authHttpPort}/graphql`,
              },
              {
                name: 'events',
                url: `http://${config.eventsHost}:${config.eventsHttpPort}/graphql`,
              },
            ],
          }),
        },
      }),
      driver: ApolloGatewayDriver,
    }),
  ],
})
export class GraphQLModule {}
