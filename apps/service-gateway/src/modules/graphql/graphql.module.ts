import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway'
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule as BaseGraphQLModule } from '@nestjs/graphql'
import { ApolloComplexityPlugin } from 'backend-shared'
import { gatewayConfig, GatewayConfigType } from 'src/config/gateway.config'
import { ConfigModule } from 'src/modules/config/config.module'

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
          buildService({ url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                request.http?.headers.set(
                  'authorization',
                  context.req?.headers.authorization
                    ? context.req?.headers.authorization
                    : undefined
                )
              },
            })
          },
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
